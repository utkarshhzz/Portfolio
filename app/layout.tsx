import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utkarsh Kumar — AI Systems Engineer",
  description:
    "AI Systems Engineer building production-grade intelligent systems — multi-agent orchestration, semantic search at 110M+ scale, and computer vision. MIT Bangalore & IIT Guwahati.",
  keywords: [
    "AI Engineer", "Machine Learning", "LangGraph", "RAG", "Multi-Agent",
    "FastAPI", "OpenAI", "Azure AI Search", "Computer Vision", "PyTorch",
    "Next.js", "Utkarsh Kumar", "MIT Bangalore", "IIT Guwahati",
  ],
  authors: [{ name: "Utkarsh Kumar" }],
  creator: "Utkarsh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Utkarsh Kumar — AI Systems Engineer",
    description:
      "Building intelligent systems that transform research into production-grade products.",
    siteName: "Utkarsh Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Kumar — AI Systems Engineer",
    description: "Building intelligent systems at the frontier of AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/hero-frames/Portfolio_utk_000.png?v=2"
          as="image"
          type="image/png"
        />
      </head>
      <body style={{ background: "#050505", overflowX: "clip" }}>
        {children}
      </body>
    </html>
  );
}
