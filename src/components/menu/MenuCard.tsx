import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

const MenuCard = ({ name, description, price, image, category }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {category && (
          <div className="absolute top-3 right-3">
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
              {category}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full">Order on WhatsApp</Button>
        </a>
      </div>
    </Card>
  );
};

export default MenuCard;
