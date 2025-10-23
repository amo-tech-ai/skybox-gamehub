import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface LeagueCardProps {
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  image: string;
  color: string;
}

const LeagueCard = ({ name, shortName, slug, tagline, image, color }: LeagueCardProps) => {
  return (
    <Link to={`/sports/${slug}`}>
      <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover-lift glow-on-hover transition-all duration-300">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            style={{ background: `linear-gradient(to top, ${color}ee, ${color}80, transparent)` }}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={20} className="text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider">{shortName}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-white/80 mb-4">{tagline}</p>
          <Button 
            variant="secondary" 
            size="sm" 
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View League
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default LeagueCard;
