import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { Download, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const styles = [
  { value: "realistic", label: "Realistic" },
  { value: "anime", label: "Anime" },
  { value: "cartoon", label: "Cartoon" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "fantasy", label: "Fantasy" },
  { value: "abstract", label: "Abstract" },
];

export default function ImageForge() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: `${style} style: ${prompt}` },
      });

      if (error) throw error;

      if (data?.image) {
        setGeneratedImage(data.image);
        toast.success("Image generated successfully!");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Image Forge</h1>
          </div>
          <p className="text-muted-foreground">
            Generate stunning AI images from your text descriptions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="glass p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-base font-semibold mb-2 block">
                  Image Prompt
                </Label>
                <Input
                  id="prompt"
                  placeholder="A majestic dragon flying over mountains at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="style" className="text-base font-semibold mb-2 block">
                  Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger id="style" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full glow"
                size="lg"
              >
                {loading ? "Generating..." : "Generate Image"}
              </Button>
            </div>
          </Card>

          <Card className="glass p-6 min-h-[500px] flex items-center justify-center">
            {loading ? (
              <LoadingAnimation />
            ) : generatedImage ? (
              <div className="space-y-4 w-full">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full rounded-lg glow"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Your generated image will appear here</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
