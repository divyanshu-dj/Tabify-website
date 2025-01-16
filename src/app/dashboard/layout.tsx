import React from 'react';
import LeftSidebar from '@/components/dashboard/leftSidebar';

import { ReactNode } from 'react';
import { Navbar } from '@/components/ui/navbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-1/6">
        <LeftSidebar />
      </div>
      <div className="w-5/6 flex flex-col">
        <Navbar />
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
