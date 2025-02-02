import { Link } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

const linkFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().optional(),
  description: z.string().optional(),
  collection: z.string(),
  importance: z.number().min(1).max(5),
  thumbnail: z.string().url().optional(),
  tags: z.string(), // Will be split into array
  isPinned: z.boolean(),
});

type LinkFormData = z.infer<typeof linkFormSchema>;

interface LinkFormProps {
  initialData?: Link;
  onSubmit: (data: LinkFormData) => void;
  onCancel: () => void;
}

export function LinkForm({ initialData, onSubmit, onCancel }: LinkFormProps) {
  const form = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: initialData?.url || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      collection: initialData?.collection || "Unorganized",
      importance: initialData?.importance || 1,
      thumbnail: initialData?.thumbnail || "",
      tags: initialData?.tags.join(", ") || "",
      isPinned: initialData?.isPinned || false,
    },
  });

  const handleSubmit = (data: LinkFormData) => {
    // Convert tags string to array
    const formattedData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL *</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>
                If left empty, the URL will be displayed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <FormControl>
                <Input placeholder="Collection name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="importance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importance (1-5)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="tag1, tag2, tag3" {...field} />
              </FormControl>
              <FormDescription>
                Separate tags with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPinned"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Pin this link</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Link" : "Add Link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
