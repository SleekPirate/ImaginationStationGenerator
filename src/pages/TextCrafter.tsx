import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { Copy, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const styles = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "poetic", label: "Poetic" },
  { value: "storytelling", label: "Storytelling" },
  { value: "academic", label: "Academic" },
  { value: "creative", label: "Creative" },
];

export default function TextCrafter() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt, style },
      });

      if (error) throw error;

      if (data?.text) {
        setGeneratedText(data.text);
        toast.success("Text generated successfully!");
      }
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success("Text copied to clipboard!");
  };

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Text Crafter</h1>
          </div>
          <p className="text-muted-foreground">
            Generate creative and compelling text content with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="glass p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-base font-semibold mb-2 block">
                  Text Prompt
                </Label>
                <Input
                  id="prompt"
                  placeholder="Write a blog post about the future of technology..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="style" className="text-base font-semibold mb-2 block">
                  Writing Style
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
                {loading ? "Generating..." : "Generate Text"}
              </Button>
            </div>
          </Card>

          <Card className="glass p-6 min-h-[500px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <LoadingAnimation />
              </div>
            ) : generatedText ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 p-4 bg-background/50 rounded-lg overflow-auto">
                  <p className="whitespace-pre-wrap">{generatedText}</p>
                </div>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Your generated text will appear here</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
