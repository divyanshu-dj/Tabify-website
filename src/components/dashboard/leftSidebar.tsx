import DrawerClient from "../ui/drawer_client";
import { Button } from "@/components/ui/button";
import ProfileButton from "../ui/profileButton";

const LeftSidebarClient = () => {
    return (
        <div className="h-screen bg-dark-blue text-white flex flex-col border-border-gray border-r-2">
            <div className="flex-1">
                <DrawerClient />
            </div>

            <div className="mt-auto">
                <ProfileButton />
            </div>
        </div>
    );
};

export default LeftSidebarClient;
