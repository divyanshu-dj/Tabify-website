import { Link } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Star, Trash2 } from "lucide-react";

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, isPinned: boolean) => void;
}

export function LinkCard({ link, onEdit, onDelete, onTogglePin }: LinkCardProps) {
  return (
    // <div className="w-full hover:shadow-md transition-shadow text-black h-full">
    //   <h1>{link.url}</h1>
    //   <p>{link.description}</p>
    //   <p>{link.collection}</p>
    //   <p>{link.importance}</p>
    //   {link.thumbnail && (
    //       <img
    //         src={link.thumbnail}
    //         alt={link.title || link.url}
    //         className="w-full h-32 object-cover rounded-t-lg"
    //       />
    //     )}
    //   <p>{link.tags}</p>
    //   <p>{link.isPinned}</p>
    //   <button onClick={() => onEdit(link)}>Edit</button>
    //   <button onClick={() => onDelete(link.id)}>Delete</button>
    //   <button onClick={() => onTogglePin(link.id, !link.isPinned)}>
    //     {link.isPinned ? "Unpin" : "Pin"}
    //   </button>
    // </div>
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="relative">
        <div className="h-32 w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Backgrounds
          </p> */}
          {link.thumbnail && (
            <img
              src={link.thumbnail}
              alt={link.title || link.url}
              className="w-32 h-32 object-cover rounded-t-lg relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"
            />
          )}
        </div>
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
