import { Card } from "@/components/ui/card";

interface FeaturePhotoCardProps {
  title: string;
  description: string;
  image: string;
}

const FeaturePhotoCard = ({ title, description, image }: FeaturePhotoCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-white/90">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeaturePhotoCard;