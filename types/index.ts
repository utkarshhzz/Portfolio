export interface NavItem {
  label: string;
  href: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: ProjectCategory;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export type ProjectCategory = "all" | "ai" | "web" | "research";

export interface Achievement {
  id: string;
  title: string;
  event: string;
  placement: string;
  prize?: string;
  description: string;
  year: string;
}

export interface Skill {
  name: string;
  level?: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}
