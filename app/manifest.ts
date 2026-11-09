import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Utkarsh Kumar — AI Systems Engineer",
    short_name: "Utkarsh Kumar",
    description: "Portfolio of Utkarsh Kumar: production AI, semantic search, multi-agent systems and computer vision.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
