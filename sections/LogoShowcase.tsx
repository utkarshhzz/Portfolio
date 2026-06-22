"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Tech logos relevant to Utkarsh's actual work
// Using the reference repo company logos (professionally styled)
const LOGOS = [
  { src: "/company-logo-1.png",  name: "NVIDIA"    },
  { src: "/company-logo-2.png",  name: "Vercel"    },
  { src: "/company-logo-3.png",  name: "Linear"    },
  { src: "/company-logo-4.png",  name: "Loom"      },
  { src: "/company-logo-5.png",  name: "Shopify"   },
  { src: "/company-logo-6.png",  name: "Microsoft" },
  { src: "/company-logo-7.png",  name: "Adidas"    },
  { src: "/company-logo-8.png",  name: "Meta"      },
  { src: "/company-logo-9.png",  name: "Apple"     },
  { src: "/company-logo-10.png", name: "Google"    },
  { src: "/company-logo-11.png", name: "Amazon"    },
];

// Duplicate for seamless loop
const ITEMS_FWD = [...LOGOS, ...LOGOS, ...LOGOS];
const ITEMS_BWD = [...LOGOS.slice().reverse(), ...LOGOS.slice().reverse(), ...LOGOS.slice().reverse()];

export default function LogoShowcase() {
  return (
    <div className="w-full py-14 bg-black overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-[0.22em] uppercase mb-10" style={{ color: "var(--text-3)" }}>
        Technologies &amp; Tools I Work With
      </p>

      {/* Row 1 — left to right */}
      <div className="relative w-full overflow-hidden mb-5" style={{ height: "64px" }}>
        {/* Gradient edges */}
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        <motion.div
          className="flex items-center gap-12 absolute"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          style={{ width: "300%" }}
        >
          {ITEMS_FWD.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center" style={{ width: "120px" }}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={110}
                height={40}
                className="object-contain transition-all duration-300"
                style={{ maxHeight: "38px", width: "auto", opacity: 0.6, filter: "brightness(0) invert(1)" }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = "1"; (e.target as HTMLImageElement).style.filter = "brightness(1) invert(0)"; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = "0.6"; (e.target as HTMLImageElement).style.filter = "brightness(0) invert(1)"; }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right to left (reversed) */}
      <div className="relative w-full overflow-hidden" style={{ height: "64px" }}>
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        <motion.div
          className="flex items-center gap-12 absolute"
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          style={{ width: "300%" }}
        >
          {ITEMS_BWD.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center" style={{ width: "120px" }}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={110}
                height={40}
                className="object-contain transition-all duration-300"
                style={{ maxHeight: "38px", width: "auto", opacity: 0.45, filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
