"use client";

import { LinkCard } from "../dashboard/LinkCard";
import useUserLinks from "@/lib/api/useUserLinks";

export default function HeroClient() {
  const { links: savedLinks, isLoading, error} = useUserLinks(); // Use the hook

  if (isLoading) {
    return <div>Loading links...</div>; // Basic loading state
  }

  if (error) {
    return <div>Error loading links: {error.message}</div>; // Basic error state
  }


  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedLinks.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={() => {}}
            onDelete={() => {}}
            onTogglePin={() => {}}
          />
        ))}
      </div>
    </div>
  );
}