"use client"

import * as React from "react"
import { Link, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { LinkForm } from "./form_client"

export default function DrawerClient() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-green-950">Save New Link</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Link</DrawerTitle>
          </DrawerHeader>
          <LinkForm onSubmit={() => {}} onCancel={() => {}} />
          <DrawerFooter>
            <div className="grid grid-cols-4 gap-4">
                <Button variant="outline" className="col-span-3">Submit</Button>
                <DrawerClose asChild>
                    <Button className="bg-red-700 opacity-30">Cancel</Button>
                </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
