import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";

const promos = [
  "🏈 VIP Rooftop Packages Available for NFL Sundays — Reserve Now",
  "⚾ World Series Watch Party — Every Game Live on the Big Screen",
  "🍺 2-for-1 Beers During 1st Quarter — Limited Time Offer",
];

const PromoBanner = () => {
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary text-secondary-foreground py-4 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Megaphone className="w-5 h-5 flex-shrink-0" />
        <p className="text-center font-semibold text-sm md:text-base animate-fade-in">
          {promos[currentPromo]}
        </p>
      </div>
    </div>
  );
};

export default PromoBanner;