// components/Topbar.js
import Image from "next/image";
import { Icon } from '@iconify/react';
import SampleUserIcon from "../images/Sample_User_Icon.png";
import { theme } from '@/lib/theme';

export default function Topbar({ toggleSidebar, isSidebarOpen }) {
    return (
        <header className="bg-white/80 backdrop-blur border-b border-emerald-100 shadow-sm p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
                {/* Left Section: Toggle Button and Title */}
                <div className="flex items-center space-x-4">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-colors duration-200"
                    >
                        {isSidebarOpen ? (
                            <Icon icon="mdi:menu-open" className="text-2xl" />
                        ) : (
                            <Icon icon="mdi:menu" className="text-2xl" />
                        )}
                    </button>
                </div>

                {/* Right Section: User Info and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                  

                    {/* User Info */}
                    <div className="text-right">
                        <p className="text-emerald-800 font-bold">suchao</p>
                        <p className="text-sm text-emerald-500">Admin</p>
                    </div>

                    {/* Profile Picture */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer ring-2 ring-emerald-200 hover:ring-emerald-400 transition-all duration-200">
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