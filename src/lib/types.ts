import { Link } from "lucide-react";
import { z } from "zod";

const linkSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().optional(),
  description: z.string().optional(),
  collection: z.string(),
  importance: z.number().min(1).max(5),
  thumbnail: z.string().url().optional(),
  tags: z.string(), // Will be split into array
  isPinned: z.boolean(),
});

type LinkData = z.infer<typeof linkSchema>;

export type { LinkData };
export { linkSchema };