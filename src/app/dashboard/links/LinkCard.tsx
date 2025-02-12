import { Link } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Edit, Star, Trash2 } from "lucide-react";

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, isPinned: boolean) => void;
}

export function LinkCard({ link, onEdit, onDelete, onTogglePin }: LinkCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="relative">
        {link.thumbnail && (
          <img
            src={link.thumbnail}
            alt={link.title || link.url}
            className="w-full h-32 object-cover rounded-t-lg"
          />
        )}
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-1">
              {link.title || link.url}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {link.collection}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onTogglePin(link.id, !link.isPinned)}
            className={link.isPinned ? "text-yellow-500" : ""}
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {link.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {link.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {link.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-2">
          <Badge variant="outline" className="text-xs">
            Priority: {link.importance}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(link)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(link.id)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
