// ponytail: in-memory, per-instance. Resets on cold start and doesn't
// share state across serverless instances — raises the bar without a new
// dependency. If abuse persists across instances, move to Upstash/Redis.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}
