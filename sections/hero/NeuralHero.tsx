"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, type MotionValue } from "framer-motion";
import HeroContent from "./HeroContent";

/* ── Shaders ────────────────────────────────────────────────────────
   Each particle carries three target positions (sphere → galaxy → wave)
   and the vertex shader blends between them from scroll progress, with a
   per-particle delay so the morph ripples instead of snapping.            */

const VERT = /* glsl */ `
  attribute vec3 aSphere;
  attribute vec3 aGalaxy;
  attribute vec3 aWave;
  attribute float aRand;
  attribute float aTint;
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float p = uProgress;
    float t1 = smoothstep(0.0, 1.0, clamp((p - 0.10 - aRand * 0.14) / 0.30, 0.0, 1.0));
    float t2 = smoothstep(0.0, 1.0, clamp((p - 0.52 - aRand * 0.14) / 0.30, 0.0, 1.0));

    // Breathing sphere
    vec3 s = aSphere * (1.0 + 0.035 * sin(uTime * 1.2 + aRand * 40.0));

    // Differentially rotating galaxy (inner arms spin faster)
    vec3 g = aGalaxy;
    float rg = length(g.xz);
    float ang = uTime * 0.22 / (0.5 + rg);
    g.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * g.xz;

    // Rolling data wave
    vec3 w = aWave;
    w.y += sin(w.x * 0.9 + uTime * 0.9) * 0.32 + cos(w.z * 1.15 + uTime * 0.65) * 0.22;

    vec3 pos = mix(mix(s, g, t1), w, t2);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) / -mv.z;

    vec3 gold  = vec3(0.77, 0.60, 0.24);
    vec3 light = vec3(0.98, 0.86, 0.55);
    vec3 cool  = vec3(0.62, 0.78, 1.0);
    vColor = mix(mix(gold, light, aRand), cool, aTint);
    vAlpha = clamp(1.15 - (-mv.z - 5.0) / 5.5, 0.18, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha * uOpacity);
  }
`;

const LINE_VERT = /* glsl */ `
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const LINE_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float a = clamp(1.2 - (vDepth - 5.0) / 4.0, 0.1, 1.0);
    gl_FragColor = vec4(0.85, 0.70, 0.35, a * uOpacity);
  }
`;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function buildTargets(count: number) {
  const sphere = new Float32Array(count * 3);
  const galaxy = new Float32Array(count * 3);
  const wave = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const tint = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const R = 2.05;
  const cols = Math.ceil(Math.sqrt(count * 2.4));
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const r = Math.random();
    rand[i] = r;
    tint[i] = Math.random() > 0.86 ? 1 : 0;

    // Sphere: fibonacci shell + a sparse inner core for depth
    if (i % 7 === 0) {
      const rr = R * 0.8 * Math.cbrt(Math.random());
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const q = Math.sqrt(1 - u * u);
      sphere.set([Math.cos(th) * q * rr, u * rr, Math.sin(th) * q * rr], i * 3);
    } else {
      const y = 1 - (i / (count - 1)) * 2;
      const q = Math.sqrt(1 - y * y);
      const th = golden * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.05;
      sphere.set([Math.cos(th) * q * R * jitter, y * R * jitter, Math.sin(th) * q * R * jitter], i * 3);
    }

    // Galaxy: three spiral arms
    const radius = 0.25 + Math.pow(Math.random(), 1.5) * 4.4;
    const branch = ((i % 3) / 3) * Math.PI * 2;
    const spin = radius * 1.05;
    const spread = (k: number) => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? -1 : 1) * k * (0.4 + radius * 0.12);
    galaxy.set(
      [Math.cos(branch + spin) * radius + spread(0.6), spread(0.35), Math.sin(branch + spin) * radius + spread(0.6)],
      i * 3,
    );

    // Wave: jittered grid plane
    const cx = i % cols;
    const cz = Math.floor(i / cols);
    wave.set(
      [(cx / cols) * 15 - 7.5 + (Math.random() - 0.5) * 0.05, 0, (cz / rows) * 9 - 5 + (Math.random() - 0.5) * 0.05],
      i * 3,
    );
  }
  return { sphere, galaxy, wave, rand, tint };
}

/** A few hundred short edges between nearby shell points: the "neural" look. */
function buildEdges(sphere: Float32Array, count: number, edges: number) {
  const out = new Float32Array(edges * 6);
  let n = 0;
  for (let tries = 0; n < edges && tries < edges * 40; tries++) {
    const a = Math.floor(Math.random() * count);
    const b = Math.floor(Math.random() * count);
    const dx = sphere[a * 3] - sphere[b * 3];
    const dy = sphere[a * 3 + 1] - sphere[b * 3 + 1];
    const dz = sphere[a * 3 + 2] - sphere[b * 3 + 2];
    const d = Math.hypot(dx, dy, dz);
    if (d > 0.18 && d < 0.75) {
      out.set([sphere[a * 3], sphere[a * 3 + 1], sphere[a * 3 + 2], sphere[b * 3], sphere[b * 3 + 1], sphere[b * 3 + 2]], n * 6);
      n++;
    }
  }
  return out.subarray(0, n * 6);
}

function NeuralCanvas({ progress, onFail }: { progress: MotionValue<number>; onFail: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (disposed || !canvas) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
      } catch {
        onFail();
        return;
      }
      renderer.setClearColor(0x000000, 0);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isSmall = window.innerWidth < 768;
      const COUNT = isSmall ? 5200 : 11000;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      const { sphere, galaxy, wave, rand, tint } = buildTargets(COUNT);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
      geo.setAttribute("aSphere", new THREE.BufferAttribute(sphere, 3));
      geo.setAttribute("aGalaxy", new THREE.BufferAttribute(galaxy, 3));
      geo.setAttribute("aWave", new THREE.BufferAttribute(wave, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
      geo.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uSize: { value: isSmall ? 30 : 34 },
          uPixelRatio: { value: 1 },
          uOpacity: { value: 0 },
        },
      });
      const points = new THREE.Points(geo, mat);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(buildEdges(sphere, COUNT, isSmall ? 220 : 420), 3));
      const lineMat = new THREE.ShaderMaterial({
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uOpacity: { value: 0 } },
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);

      const spin = new THREE.Group(); // auto-rotation
      spin.add(points, lines);
      const tilt = new THREE.Group(); // mouse parallax + layout offset
      tilt.add(spin);
      scene.add(tilt);

      // Layout: object sits right of the text on desktop, above it on mobile
      let layout = { x: 0, y: 0, scale: 1 };
      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(w, h, false);
        mat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        layout = w < 768 ? { x: 0, y: 1.25, scale: 0.72 } : { x: w > 1280 ? 2.1 : 1.7, y: 0, scale: 1 };
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(canvas);

      let raf = 0;
      let last = performance.now();
      let elapsed = 0;
      const start = last;

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) { last = now; return; }
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!reduceMotion) elapsed += dt;

        const p = progress.get();
        const intro = smooth(0, 1.4, (now - start) / 1000); // fade in on load
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uProgress.value = p;
        mat.uniforms.uOpacity.value = intro * (1 - smooth(0.9, 1, p) * 0.6);
        lineMat.uniforms.uOpacity.value = intro * 0.22 * (1 - smooth(0.06, 0.22, p));

        if (!reduceMotion) spin.rotation.y += dt * (0.14 - smooth(0.5, 0.8, p) * 0.12);

        // Center the object as the quote takes over, then tilt into the wave
        const centre = smooth(0.12, 0.4, p);
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        tilt.position.x = layout.x * (1 - centre);
        tilt.position.y = layout.y * (1 - centre);
        const s = layout.scale + (1 - layout.scale) * centre;
        tilt.scale.setScalar(s);
        tilt.rotation.x = mouse.y * 0.18 + smooth(0.0, 0.3, p) * 0.35;
        tilt.rotation.y = mouse.x * 0.28;

        const fly = smooth(0.55, 1, p);
        camera.position.set(0, fly * 2.6, 7.5 - fly * 1.6);
        camera.lookAt(0, -fly * 0.6, 0);

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geo.dispose();
        mat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        renderer.dispose();
      };
    })().catch(onFail);

    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress, onFail]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-[1] block h-full w-full" />;
}

export default function NeuralHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [webglFailed, setWebglFailed] = useState(false);
  const onFail = useCallback(() => setWebglFailed(true), []);

  return (
    <section id="hero" ref={ref} className="relative h-[260vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#080808]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_55%_at_70%_45%,rgba(196,154,60,0.13),transparent_70%),radial-gradient(40%_40%_at_20%_80%,rgba(96,140,220,0.07),transparent_70%)]"
        />
        {!webglFailed && <NeuralCanvas progress={scrollYProgress} onFail={onFail} />}
        <HeroContent progress={scrollYProgress} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>
    </section>
  );
}
