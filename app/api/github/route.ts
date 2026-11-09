/**
 * GET /api/github — profile + last-year contributions for the GitHub section.
 *
 * Fetched on the server and cached for an hour, so visitors never hit GitHub's
 * 60-requests/hour unauthenticated limit and the browser only talks to this origin.
 * Optional: set GITHUB_TOKEN in Vercel for a 5,000/hour limit.
 */

export const revalidate = 3600;

const USER = "utkarshhzz";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

async function getJson<T>(url: string, headers: HeadersInit = {}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "utkarshkumar-portfolio", ...headers },
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const [profile, contrib] = await Promise.all([
    getJson<{ public_repos: number; followers: number }>(
      `https://api.github.com/users/${USER}`,
      token ? { Authorization: `Bearer ${token}` } : {},
    ),
    getJson<{ total: Record<string, number>; contributions: Day[] }>(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
    ),
  ]);

  const days = contrib?.contributions ?? null;
  return Response.json(
    {
      user: USER,
      publicRepos: profile?.public_repos ?? null,
      followers: profile?.followers ?? null,
      total: contrib ? contrib.total?.lastYear ?? days?.reduce((s, d) => s + d.count, 0) ?? null : null,
      days,
      updatedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
