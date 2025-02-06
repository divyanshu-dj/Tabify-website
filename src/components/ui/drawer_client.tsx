"use client";

import * as React from "react";
import { Link, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { LinkForm } from "./form_client";

export default function DrawerClient() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="bg-green-950">
                    Save New Link
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg p-4">
                    <DrawerHeader>
                        <DrawerTitle>
                            Create New Link
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="border-b mb-4 w-full border-gray-600"></div>
                    <LinkForm onSubmit={() => {}} onCancel={() => {}} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
