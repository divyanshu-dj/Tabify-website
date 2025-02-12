import React from 'react';
import LeftSidebar from '@/components/dashboard/leftSidebar';
import SidebarDemo from '@/components/dashboard/SidebarDemo';

import { cn } from "@/lib/utils";

import { ReactNode } from 'react';
import { Navbar } from '@/components/ui/navbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex rounded-md flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full overflow-hidden">
      {/* <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      
    </div> */}
      <div className="w-1/6">
        {/* <SidebarDemo /> */}
        <LeftSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
