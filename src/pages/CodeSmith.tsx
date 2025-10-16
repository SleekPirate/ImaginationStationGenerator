import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { Copy, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "rust", label: "Rust" },
];

export default function CodeSmith() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { prompt, language },
      });

      if (error) throw error;

      if (data?.code) {
        setGeneratedCode(data.code);
        toast.success("Code generated successfully!");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Code Smith</h1>
          </div>
          <p className="text-muted-foreground">
            Generate clean, functional code snippets in multiple languages
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="glass p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-base font-semibold mb-2 block">
                  Code Description
                </Label>
                <Input
                  id="prompt"
                  placeholder="Create a function that sorts an array of numbers..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="language" className="text-base font-semibold mb-2 block">
                  Programming Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
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
                {loading ? "Generating..." : "Generate Code"}
              </Button>
            </div>
          </Card>

          <Card className="glass p-6 min-h-[500px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <LoadingAnimation />
              </div>
            ) : generatedCode ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 p-4 bg-background/50 rounded-lg overflow-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                </div>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <Code className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Your generated code will appear here</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
