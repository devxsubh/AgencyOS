// Minimal Gemini client (free tier, no SDK). Get a key at https://aistudio.google.com/apikey
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export interface GeminiTurn {
  role: 'user' | 'model';
  text: string;
}

export async function generateText(systemPrompt: string, turns: GeminiTurn[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini request failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('').trim();
  if (!text) throw new Error('Gemini returned no content');
  return text;
}
