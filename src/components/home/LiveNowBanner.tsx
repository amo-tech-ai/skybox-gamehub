import { Radio } from "lucide-react";

const LiveNowBanner = () => {
  return (
    <div className="bg-destructive text-destructive-foreground py-2 px-4 flex items-center justify-center gap-2 animate-pulse">
      <Radio className="w-4 h-4 animate-bounce" />
      <span className="text-sm font-bold uppercase tracking-wider">
        LIVE NOW: NFL 2025 Season - Every Sunday
      </span>
      <Radio className="w-4 h-4 animate-bounce" />
    </div>
  );
};

export default LiveNowBanner;