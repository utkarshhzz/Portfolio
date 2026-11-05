/**
 * Hackathon results. Add new wins at the top of `ACHIEVEMENTS`.
 *
 * rank      1 = winner, 2 = second place / 1st runner-up,
 *           3 = third place / 2nd runner-up, 4 = fourth place
 * images    first image is the cover; extra images show in the lightbox
 * fit       "contain" for posters/certificates that must not be cropped
 * span      "tall" makes the card span two rows in the desktop grid
 */

export type Rank = 1 | 2 | 3 | 4;

export interface AchievementImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Achievement {
  id: string;
  event: string;
  placement: string;
  rank: Rank;
  organizer: string;
  partners?: string;
  date?: string;
  team?: string;
  prize?: string;
  summary: string;
  images: AchievementImage[];
  fit?: "cover" | "contain";
  focus?: string;
  span?: "tall";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "agentops-26",
    event: "AgentOps '26",
    placement: "1st Runner-Up",
    rank: 2,
    organizer: "SDG Club, MIT Bengaluru",
    partners: "CGI · MIT SoCE",
    date: "Oct 2026",
    team: "Team BitFlux",
    summary:
      "Second place at AgentOps '26, an agentic-AI challenge run by the SDG Club of MIT Bengaluru with CGI and the School of Computer Engineering.",
    images: [
      {
        src: "/achievements/agentops-26.jpg",
        alt: "AgentOps '26 runner-up trophy and Certificate of Excellence awarded to Team BitFlux",
        width: 480,
        height: 853,
      },
    ],
    focus: "50% 45%",
    span: "tall",
  },
  {
    id: "hackverse-2",
    event: "HackVerse 2.0",
    placement: "2nd Prize",
    rank: 2,
    organizer: "MIT Bengaluru",
    partners: "IBM · 1M1B",
    summary:
      "Second prize on the “Open Innovation with AI” track at HackVerse 2.0, run with IBM and 1M1B (1 Million for 1 Billion).",
    images: [
      {
        src: "/achievements/hackverse-2.jpg",
        alt: "Receiving the HackVerse 2.0 second prize on stage under the Open Innovation with AI banner",
        width: 480,
        height: 271,
      },
    ],
  },
  {
    id: "vibe2ship",
    event: "Vibe2Ship",
    placement: "4th Place",
    rank: 4,
    organizer: "Google for Developers × Coding Ninjas",
    prize: "₹40,000",
    summary:
      "Registered, nearly let the deadline pass without building anything, then built and shipped KisanMitra in the final stretch and landed in the top 5 who “shipped it best”.",
    images: [
      {
        src: "/achievements/vibe2ship.jpg",
        alt: "Vibe2Ship top 5 leaderboard listing Utkarsh Kumar in 4th position",
        width: 160,
        height: 213,
      },
    ],
    fit: "contain",
  },
  {
    id: "ignisia",
    event: "Ignisia",
    placement: "2nd Runner-Up",
    rank: 3,
    organizer: "MIT World Peace University, Pune",
    date: "Apr 2026",
    prize: "₹20,000",
    summary:
      "Third place at a 24-hour national-level AI hackathon with 1,600+ participants.",
    images: [
      {
        src: "/achievements/Ignisia_3rd.jpg",
        alt: "Ignisia grand finale prize ceremony at MIT World Peace University",
        width: 1280,
        height: 853,
      },
    ],
    focus: "50% 70%",
  },
  {
    id: "lovelace",
    event: "Lovelace · Turinger 2026",
    placement: "2nd Runner-Up",
    rank: 3,
    organizer: "MITB ACM Student Chapter",
    partners: "Nokia · Mastra · Code Basics",
    date: "Feb 2026",
    prize: "₹20,000",
    summary:
      "Third place in Lovelace, part of the Turinger 2026 tech fest at MIT Bengaluru.",
    images: [
      {
        src: "/achievements/lovelace_3rd.jpg",
        alt: "Team holding the Lovelace 2nd runner-up cheque for ₹20,000",
        width: 800,
        height: 1066,
      },
      {
        src: "/achievements/Hackathon_certificate.png",
        alt: "Turinger 2026 certificate: Utkarsh Kumar secured third place in Lovelace",
        width: 2000,
        height: 1414,
      },
    ],
    focus: "50% 72%",
  },
  {
    id: "hacksprint",
    event: "HackSprint",
    placement: "2nd Place",
    rank: 2,
    organizer: "IGNITE Innovation Club, MIT Bengaluru",
    team: "Team BitFlux",
    summary:
      "Second place at HackSprint, a time-boxed build sprint run by IGNITE, MIT Bengaluru's innovation club.",
    images: [
      {
        src: "/achievements/Bitflux_second.jpg",
        alt: "HackSprint certificate of achievement awarded to Team BitFlux for second place",
        width: 1179,
        height: 845,
      },
    ],
    focus: "50% 40%",
  },
  {
    id: "hackbricks",
    event: "Hackbricks",
    placement: "1st Runner-Up",
    rank: 2,
    organizer: "Indian Data Club",
    summary: "First runner-up at Hackbricks, hosted with the Indian Data Club.",
    images: [
      {
        src: "/achievements/Hackbricks_2nd.jpg",
        alt: "Hackbricks participants and organisers with the first runner-up trophy",
        width: 1280,
        height: 960,
      },
    ],
    focus: "50% 55%",
  },
];

/** Wins without a photo. Shown as a compact card. */
export const OTHER_WINS = [
  {
    id: "agnisense",
    event: "AgniSense",
    placement: "Winner",
    rank: 1 as Rank,
    detail: "National-level hackathon",
    prize: "₹75,000",
    summary:
      "Predictive fire-risk and operational command platform: 5 municipal datasets fused into one feature store, with a FastAPI ML backend scoring 1.7+ GB of telemetry in real time.",
    href: "https://github.com/utkarshhzz/AgniSense",
  },
];

export const MEDAL: Record<Rank, { color: string; label: string }> = {
  1: { color: "#E8BE4F", label: "Gold" },
  2: { color: "#C8D0DA", label: "Silver" },
  3: { color: "#D08A52", label: "Bronze" },
  4: { color: "#86A8D6", label: "Top 5" },
};

export const PODIUM_COUNT =
  ACHIEVEMENTS.filter((a) => a.rank <= 3).length +
  OTHER_WINS.filter((w) => w.rank <= 3).length;
