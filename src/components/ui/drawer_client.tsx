"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LinkForm } from "./form_client";

export default function DrawerClient() {
  // Manage the open/close state of the drawer
  const [isOpen, setIsOpen] = React.useState(false);

  // A callback to close the drawer
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-green-950">
          Save New Link
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg p-4">
          <DrawerHeader>
            <DrawerTitle>Create New Link</DrawerTitle>
          </DrawerHeader>
          <div className="border-b mb-4 w-full border-gray-600"></div>
          {/* Pass the handleClose callback to your form */}
          <LinkForm onClose={handleClose}/>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
