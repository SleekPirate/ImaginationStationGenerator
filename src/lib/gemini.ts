export async function generateFromGemini(prompt: string, type: 'text' | 'code') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = type === 'code' ? 'gemini-pro-code' : 'gemini-pro';

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No output generated.";
}
