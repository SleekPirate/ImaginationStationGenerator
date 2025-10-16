export async function generateImage(prompt: string, style: string) {
  const apiKey = import.meta.env.VITE_STABLE_DIFFUSION_API_KEY;

  const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: `${prompt}, style: ${style}`,
      output_format: "base64"
    }),
  });

  const data = await response.json();

  if (data.image) {
    return `data:image/png;base64,${data.image}`;
  } else {
    throw new Error("Image generation failed");
  }
}
