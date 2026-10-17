// Stateless signed session tokens (HMAC-SHA256) built on Web Crypto so the
// same code runs in the Edge middleware and in Node route handlers.

export const SESSION_COOKIE = 'auth-token';
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours, in seconds

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function hmacKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set to a random string of at least 32 characters');
  }
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function createSessionToken(subject: string): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ sub: subject, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE }))
  );
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(), encoder.encode(payload));
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

/** Returns the session subject when the token is authentic and unexpired, otherwise null. */
export async function verifySessionToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const [payload, signature, ...rest] = token.split('.');
  if (!payload || !signature || rest.length) return null;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(),
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!valid) return null;

    const { sub, exp } = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    if (typeof sub !== 'string' || typeof exp !== 'number' || exp < Date.now() / 1000) return null;
    return sub;
  } catch {
    return null;
  }
}

/** Constant-time string comparison that does not leak length. */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}
