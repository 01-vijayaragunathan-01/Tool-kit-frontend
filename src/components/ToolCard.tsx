import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RatingStars from "./RatingStars";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  imageUrl: string;
}

const ToolCard = ({ id, name, description, category, rating, imageUrl }: ToolCardProps) => {
  return (
    <Link to={`/tools/${id}`}>
      <Card className="glass-card overflow-hidden hover:scale-105 smooth-transition cursor-pointer group h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 smooth-transition" />
          <Badge className="absolute top-4 right-4 gradient-primary text-white">
            {category}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary smooth-transition">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} readonly size="sm" />
            <span className="text-sm font-semibold text-muted-foreground">
              {rating.toFixed(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;