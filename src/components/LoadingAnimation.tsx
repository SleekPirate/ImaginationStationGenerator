export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin animate-glow-pulse" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <div className="flex space-x-1">
        <span className="text-lg font-medium animate-pulse">Generating</span>
        <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
        <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
      </div>
    </div>
  );
}
