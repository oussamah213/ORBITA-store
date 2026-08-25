type Entry = { count: number; resetAt: number };

const attempts = new Map<string, Entry>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 20;

export function getRequestKey(request: Request, scope: string) {
  return `${scope}:${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"}`;
}

export function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}
