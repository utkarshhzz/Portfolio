/** Single source of truth for page sections (navbar, side dots, command palette). */
export const SECTIONS = [
  { id: "hero",         label: "Intro",        nav: false },
  { id: "identity",     label: "About",        nav: false },
  { id: "projects",     label: "Work",         nav: true  },
  { id: "experience",   label: "Experience",   nav: true  },
  { id: "achievements", label: "Achievements", nav: true  },
  { id: "skills",       label: "Skills",       nav: true  },
  { id: "education",    label: "Education",    nav: true  },
  { id: "github",       label: "GitHub",       nav: false },
  { id: "contact",      label: "Contact",      nav: false },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const SECTION_IDS: string[] = SECTIONS.map((s) => s.id);

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export const LINKS = {
  github: "https://github.com/utkarshhzz",
  linkedin: "https://www.linkedin.com/in/utkarsh-kumar-801703321/",
  leetcode: "https://leetcode.com/u/utkarshzz/",
  email: "unofficialutkarsh.06@gmail.com",
  phone: "+91 73527 17183",
  resume: "/resume.pdf",
} as const;
