import ProfileButton from "../ui/profileButton";

const LeftSidebarClient = () => {
    return (
        <div className="h-screen bg-dark-blue text-white flex flex-col border-gray-700 border-r-2">
            <div className="flex-1">

            </div>

            <div className="mt-auto">
                <ProfileButton />
            </div>
        </div>
    );
};

export default LeftSidebarClient;