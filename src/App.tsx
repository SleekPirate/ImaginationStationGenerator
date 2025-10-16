import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Home from "./pages/Home";
import ImageForge from "./pages/ImageForge";
import TextCrafter from "./pages/TextCrafter";
import CodeSmith from "./pages/CodeSmith";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/image-forge" element={<ImageForge />} />
              <Route path="/text-crafter" element={<TextCrafter />} />
              <Route path="/code-smith" element={<CodeSmith />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
/*flex-1 md:ml-64*/