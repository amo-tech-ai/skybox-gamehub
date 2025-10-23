import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterChips = ({ categories, activeCategory, onCategoryChange }: FilterChipsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <Badge
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`cursor-pointer px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all hover-scale ${
            activeCategory === category
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-primary/20"
          }`}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default FilterChips;