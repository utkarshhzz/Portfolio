"use client";

// Inline SVG icons to avoid broken image dependencies
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125 2.227 5.465 5.465 0 00.35 1.938 5.337 5.337 0 001.047 1.7l4.468 4.58a1.37 1.37 0 001.977.014l1.434-1.428a1.373 1.373 0 00.009-1.932L9.118 17.4l-1.42-1.457a2.604 2.604 0 01-.763-1.861 2.56 2.56 0 01.246-1.094 2.59 2.59 0 01.717-.928L12 8.73l4.1-4.214a1.374 1.374 0 00-.02-1.94L14.68.47a1.374 1.374 0 00-1.197-.47zm4.026 5.918L14.16 9.418l3.324 3.41a5.355 5.355 0 010 7.502l-.006.005c-.05.05-.099.094-.15.14l-.005.003a5.306 5.306 0 01-7.49-.022l-1.42-1.457 2.86-2.86 1.42 1.457a1.374 1.374 0 001.963.014l.005-.005a1.374 1.374 0 000-1.94l-3.324-3.41 3.347-3.437a1.374 1.374 0 000-1.943l-.007-.007a1.374 1.374 0 00-1.94.008z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/utkarshhzz",
    icon: <GitHubIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/utkarsh-kumar-801703321/",
    icon: <LinkedInIcon />,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/utkarshzz/",
    icon: <LeetCodeIcon />,
  },
  {
    name: "Email",
    href: "mailto:unofficialutkarsh.06@gmail.com",
    icon: <EmailIcon />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div>
          <p className="font-semibold text-white">Utkarsh Kumar</p>
          <p className="text-xs text-blue-50 mt-1">
            © {year} · AI Systems Engineer
          </p>
          <p className="text-xs text-blue-50">MIT Bangalore · IIT Guwahati</p>
          <p className="text-xs text-blue-50 mt-1">📞 +91 73527 17183</p>
        </div>

        {/* Center — socials with SVG icons */}
        <div className="socials">
          {SOCIAL_LINKS.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={name}
              className="icon"
              title={name}
              style={{ color: "#a1a1aa" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 md:items-end items-center">
          <a
            href="/resume.pdf"
            download="Utkarsh_Kumar_Resume.pdf"
            className="text-xs text-blue-50 hover:text-white transition-colors"
          >
            Download Resume ↗
          </a>
          <a
            href="https://github.com/utkarshhzz/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-50 hover:text-white transition-colors"
          >
            View Source ↗
          </a>
          <a
            href="mailto:unofficialutkarsh.06@gmail.com"
            className="text-xs text-blue-50 hover:text-white transition-colors"
          >
            unofficialutkarsh.06@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
