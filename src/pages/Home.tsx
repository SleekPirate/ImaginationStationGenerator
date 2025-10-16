import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageIcon, FileText, Code, Sparkles } from "lucide-react";

const features = [
  {
    title: "Image Forge",
    description: "Generate stunning AI images from text prompts with customizable styles",
    icon: ImageIcon,
    href: "/image-forge",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Text Crafter",
    description: "Create compelling content with AI-powered text generation",
    icon: FileText,
    href: "/text-crafter",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Code Smith",
    description: "Generate code snippets in multiple programming languages",
    icon: Code,
    href: "/code-smith",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles className="h-4 w-4 text-accent animate-glow-pulse" />
            <span className="text-sm font-medium">The Best AI-Powered Content Generator</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            IMAGINATION STATION
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bring your imagination to life with our suite of AI-powered generators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="glass p-6 hover:glow transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(feature.href)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Get Started →
              </Button>
            </Card>
          ))}
        </div>

        <Card className="glass p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Choose Your Generator</h3>
              <p className="text-sm text-muted-foreground">
                Select from Image Forge, Text Crafter, or Code Smith
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Customize Your Prompt</h3>
              <p className="text-sm text-muted-foreground">
                Enter your prompt and select style preferences
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Generate & Download</h3>
              <p className="text-sm text-muted-foreground">
                Watch the AI work its magic and download your results
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
