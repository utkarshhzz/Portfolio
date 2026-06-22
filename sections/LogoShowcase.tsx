"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Tech logos from reference repo (white silhouette style on dark bg)
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

// Triple for truly seamless loop
const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

export default function LogoShowcase() {
  return (
    <div className="w-full py-14 bg-black overflow-hidden">
      <motion.p
        className="text-center text-xs font-semibold tracking-[0.22em] uppercase mb-10"
        style={{ color: "var(--text-3)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Technologies &amp; Tools I Work With
      </motion.p>

      {/* Single seamless marquee row */}
      <div className="marquee" style={{ height: "72px" }}>
        {/* Gradient fade edges */}
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        {/* Scrolling track — CSS animation for rock-solid reliability */}
        <div
          className="marquee-box"
          style={{
            animation: "marquee 40s linear infinite",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {ITEMS.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: "110px" }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={100}
                height={36}
                className="object-contain"
                style={{
                  maxHeight: "36px",
                  width: "auto",
                  opacity: 0.55,
                  filter: "brightness(0) invert(1)",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "1";
                  (e.currentTarget as HTMLImageElement).style.filter = "brightness(1) invert(0)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.55";
                  (e.currentTarget as HTMLImageElement).style.filter = "brightness(0) invert(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
