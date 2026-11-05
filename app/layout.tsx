import type { Metadata, Viewport } from "next";
import { Mona_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://utkarshkumar-theta.vercel.app";

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  display: "swap",
});

// Mono and serif are not needed for first paint, so skip their preload
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "Utkarsh Kumar builds production AI systems: semantic search over 110M+ records, multi-agent orchestration and real-time computer vision. MIT Bengaluru & IIT Guwahati, IGARSS 2026 author, 7 hackathon podiums.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Utkarsh Kumar — AI Systems Engineer",
  description: DESCRIPTION,
  keywords: [
    "Utkarsh Kumar", "AI Engineer", "Software Engineer", "Machine Learning",
    "LangGraph", "RAG", "Multi-Agent", "FastAPI", "Azure AI Search",
    "Computer Vision", "PyTorch", "MIT Bengaluru", "IIT Guwahati",
  ],
  authors: [{ name: "Utkarsh Kumar", url: SITE_URL }],
  creator: "Utkarsh Kumar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Utkarsh Kumar — AI Systems Engineer",
    description: "Production AI systems: semantic search at 110M+ scale, multi-agent orchestration and computer vision.",
    siteName: "Utkarsh Kumar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Kumar — AI Systems Engineer",
    description: "Production AI systems: semantic search at 110M+ scale, multi-agent orchestration and computer vision.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Utkarsh Kumar",
  url: SITE_URL,
  image: `${SITE_URL}/profile.webp`,
  jobTitle: "AI Systems Engineer",
  email: "mailto:unofficialutkarsh.06@gmail.com",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Manipal Institute of Technology, Bengaluru" },
    { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Guwahati" },
  ],
  sameAs: [
    "https://github.com/utkarshhzz",
    "https://www.linkedin.com/in/utkarsh-kumar-801703321/",
    "https://leetcode.com/u/utkarshzz/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mona.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
