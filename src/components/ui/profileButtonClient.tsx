"use client";

import { Button } from "./button";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface LeftSidebarClientProps {
    session: {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    } | null;
}

export const ProfileButtonClient: React.FC<LeftSidebarClientProps> = ({
    session,
}) => {
    const signOutOfAccount = () => signOut({ callbackUrl: "/api/auth/signin" });
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="relative overflow-hidden min-h-[3.5rem]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* User Info */}
            <div
                className={`absolute inset-0 w-full flex justify-center items-center bg-tertiary-black py-2 sm:py-3 transition-transform duration-500 ${
                    isHovered ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <img
                    src={`${session?.user?.image || ""}`}
                    alt="Profile"
                    className="rounded-full w-8 h-8 sm:w-10 sm:h-10 mr-3"
                />
                <span className="truncate max-w-[70%] sm:max-w-[80%]">
                    {session?.user?.name
                        ? session.user.name.length > 15
                            ? `${session.user.name.slice(0, 15)}...`
                            : session.user.name
                        : "Guest"}
                </span>
            </div>

            {/* Logout Button */}
            <div
                className={`absolute inset-0 w-full flex justify-center items-center bg-tertiary-black py-2 sm:py-3 transition-transform duration-500 ${
                    isHovered ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Button
                    onClick={signOutOfAccount}
                    className="bg-red-500 text-white w-3/4 sm:w-2/3 lg:w-1/2"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};
