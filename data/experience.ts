import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "provaantech",
    role: "AI / Software Engineering Intern",
    company: "Provaantech",
    period: "2024 – Present",
    type: "Internship",
    description:
      "Built a production-grade AI Candidate Discovery Engine that performs semantic search across 110M+ resumes, returning the top 10 best-fit candidates in under 10 seconds.",
    highlights: [
      "Architected an AI Candidate Discovery Engine operating over a corpus of 110M+ resumes",
      "Achieved top-10 candidate retrieval in under 10 seconds using Azure AI Search + vector indexing",
      "Integrated OpenAI Embeddings for semantic resume-to-job-description matching",
      "Built GPT-powered explanation layer that generates natural-language match rationales per candidate",
      "Designed semantic retrieval pipeline reducing irrelevant candidate noise by over 60%",
    ],
    tech: [
      "OpenAI",
      "Azure AI Search",
      "FastAPI",
      "PostgreSQL",
      "Python",
      "Vector Embeddings",
    ],
  },
  {
    id: "avss-tech",
    role: "Software Engineering Intern",
    company: "AVSS Tech",
    period: "2023",
    type: "Internship",
    description:
      "Developed and optimized a real-time face recognition pipeline that achieved 92%+ accuracy while significantly reducing inference latency.",
    highlights: [
      "Built a real-time Face Recognition Pipeline achieving 92%+ identification accuracy",
      "Reduced end-to-end inference latency by 35% through model optimization and batching strategies",
      "Implemented multi-face detection with bounding-box tracking for surveillance-grade reliability",
      "Integrated OpenCV preprocessing pipeline for lighting normalization and image augmentation",
    ],
    tech: ["PyTorch", "OpenCV", "Python", "Computer Vision", "Flask"],
  },
  {
    id: "ieee-grss",
    role: "Researcher",
    company: "IEEE GRSS",
    period: "2023",
    type: "Research",
    description:
      "Conducted original climate research using 15 years of NASA satellite data across 210 weather stations to develop a machine-learning-based rainfall prediction model.",
    highlights: [
      "Analyzed 15 years of NASA TRMM/GPM satellite data across 210 weather stations",
      "Achieved R² = 0.581, MAE = 2.17 mm, and Skill Score = 0.510 on held-out test data",
      "Developed a regression pipeline comparing XGBoost, Random Forest, and neural baselines",
      "Contributed findings to IEEE GRSS research on remote-sensing-driven precipitation forecasting",
    ],
    tech: [
      "Python",
      "Scikit-Learn",
      "XGBoost",
      "NASA TRMM/GPM",
      "Pandas",
      "Matplotlib",
    ],
  },
];
