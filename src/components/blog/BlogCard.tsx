import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogArticle } from "@/data/blogArticles";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  article: BlogArticle;
}

export const BlogCard = ({ article }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/blog/${article.slug}`}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
              {article.category}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-6 space-y-4">
        <Link to={`/blog/${article.slug}`}>
          <h3 className="text-2xl font-bold hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <span className="text-sm font-medium">
          {article.author.name}
        </span>
      </CardFooter>
    </Card>
  );
};
