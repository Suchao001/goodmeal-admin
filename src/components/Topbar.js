// components/Topbar.js
import Image from "next/image";
import { Icon } from '@iconify/react';
import SampleUserIcon from "../images/Sample_User_Icon.png";

export default function Topbar({ toggleSidebar, isSidebarOpen }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
                {/* Left Section: Toggle Button and Title */}
                <div className="flex items-center space-x-4">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors duration-200"
                    >
                        {isSidebarOpen ? (
                            <Icon icon="mdi:menu-open" className="text-2xl" />
                        ) : (
                            <Icon icon="mdi:menu" className="text-2xl" />
                        )}
                    </button>
                    {/* Title */}
                    
                </div>

                {/* Right Section: User Info and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                  

                    {/* User Info */}
                    <div className="text-right">
                        <p className="text-gray-800 font-bold">suchao</p>
                        <p className="text-sm text-gray-500">Admin</p>
                    </div>

                    {/* Profile Picture */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200">
                        <Image
                            src={SampleUserIcon}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}