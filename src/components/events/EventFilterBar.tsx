import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventFilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

const categories = ["All", "Baseball", "Soccer", "UFC", "Basketball", "Football"];

const EventFilterBar = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onReset,
}: EventFilterBarProps) => {
  return (
    <div className="bg-card border-b sticky top-16 z-40 backdrop-blur-sm bg-background/95">
      <div className="container px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={selectedCategory === category ? "gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search events or teams..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={onReset} size="sm">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilterBar;
