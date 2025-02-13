import { Link } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import useUserLinks from "@/lib/api/useUserLinks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import TagsInput from "@/components/ui/tag_field";
import Importance from "./importance_field";

const linkFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().optional(),
  description: z.string().optional(),
  collection: z.string().optional(),
  importance: z.coerce.number().min(1).max(5),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
});

type LinkFormData = z.infer<typeof linkFormSchema>;

interface LinkFormProps {
  initialData?: Link;
  onClose: () => void;
}

export function LinkForm({ initialData, onClose}: LinkFormProps) {
  const form = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: initialData?.url || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      collection: initialData?.collection || "Unorganized",
      importance: initialData?.importance || 1,
      thumbnail: initialData?.thumbnail || undefined,
      tags: initialData?.tags || [],
      isPinned: initialData?.isPinned || false,
    },
  });

  const { mutateLinks } = useUserLinks();
  
  const onSubmit: SubmitHandler<LinkFormData> = async(data) => {
    try {
      console.log("Form data:", data);

      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        form.setError("root", {
          type: "server",
          message: result.error || "Failed to create link",
        });
        console.error("Error creating link:", result.error);
        return;
      }
      
      mutateLinks();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        type: "server",
        message: "Submission failed. Please try again.",
      });
    }
  }

  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
          onSubmit,
          (errors) => {
            console.log("Validation errors:", errors); // Add this line
          }
        )}  className="space-y-4">
        <div className={`grid grid-cols-1 gap-4 ${showAdvanced ? "md:grid-cols-3" : ""}`}>
          <div className={showAdvanced ? "col-span-2" : "col-span-full"}>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-gray-600"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>
          {showAdvanced && (
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-gray-600"
                      placeholder="Collection name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="importance"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-5">
                <FormLabel>Importance</FormLabel>
                <FormControl>
                  <Importance field={{ ...field, value: Number(field.value) || 1 }} />
                </FormControl>
              </div>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        {showAdvanced && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-gray-600"
                        placeholder="Enter a title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
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
                      <TagsInput field={{ ...field, value: field.value || [] }} />

                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Anything important to note?"
                      className="resize-none h-11 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="button" onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? (
            <>
              <ChevronDown size={24} />
              Show Less
            </>
          ) : (
            <>
              <ChevronUp size={24} />
              Show More
            </>
          )}
        </Button>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all rounded-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="spinner-border spinner-border-sm mr-1" />
              ) : (
                initialData ? "Update Link" : "Save Link"
              )}
            </Button>

            <DrawerClose asChild>
              <Button
                type="button"
                variant="outline"
                className="px-6 h-11 border-gray-700 hover:bg-gray-800/50 transition-all rounded-lg"
              >
                Back
              </Button>
            </DrawerClose>
          </div>
      </form>
    </Form>
  );
}
