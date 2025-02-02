"use client";

import { useState } from "react";
import { Link } from "@prisma/client";
import { LinkCard } from "@/components/dashboard/LinkCard";
import { LinkForm } from "@/components/dashboard/LinkForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const { toast } = useToast();

  // Fetch links on component mount
  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links");
      if (!response.ok) throw new Error("Failed to fetch links");
      const data = await response.json();
      setLinks(data.links);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch links",
        variant: "destructive",
      });
    }
  };

  // Create new link
  const handleCreate = async (formData: any) => {
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create link");
      
      await fetchLinks();
      setIsFormOpen(false);
      toast({
        title: "Success",
        description: "Link created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create link",
        variant: "destructive",
      });
    }
  };

  // Update existing link
  const handleUpdate = async (formData: any) => {
    if (!editingLink) return;

    try {
      const response = await fetch(`/api/links/${editingLink.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update link");
      
      await fetchLinks();
      setEditingLink(null);
      toast({
        title: "Success",
        description: "Link updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
    }
  };

  // Delete link
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete link");
      
      await fetchLinks();
      toast({
        title: "Success",
        description: "Link deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      });
    }
  };

  // Toggle pin status
  const handleTogglePin = async (id: string, isPinned: boolean) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned }),
      });

      if (!response.ok) throw new Error("Failed to update link");
      
      await fetchLinks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Links</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={(link) => setEditingLink(link)}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
          />
        ))}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
          </DialogHeader>
          <LinkForm
            onSubmit={handleCreate}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingLink} onOpenChange={(open) => !open && setEditingLink(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
          </DialogHeader>
          {editingLink && (
            <LinkForm
              initialData={editingLink}
              onSubmit={handleUpdate}
              onCancel={() => setEditingLink(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
