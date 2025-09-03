// components/Topbar.js
import Image from "next/image";
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SampleUserIcon from "../images/Sample_User_Icon.png";
import { theme } from '@/lib/theme';
import { showConfirm } from '@/lib/sweetAlert';

export default function Topbar({ toggleSidebar, isSidebarOpen }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        router.push('/admin-profile');
    };

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        
        const confirmed = await showConfirm({
            title: 'ออกจากระบบ?',
            text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
            icon: 'question',
            confirmButtonText: 'ออกจากระบบ',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#dc2626', // Red color for logout
            showCancelButton: true
        });

        if (confirmed) {
            // Clear any auth tokens/data
            localStorage.removeItem('authToken'); // Example
            router.push('/login');
        }
    };

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
                    
                    {/* User Info */}
                    <div className="text-right">
                        <p className="text-emerald-800 font-bold">suchao</p>
                        <p className="text-sm text-emerald-500">Admin</p>
                    </div>

                    {/* Profile Picture with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div 
                            className="w-12 h-12 rounded-full overflow-hidden cursor-pointer ring-2 ring-emerald-200 hover:ring-emerald-400 transition-all duration-200"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <Image
                                src={SampleUserIcon}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 z-50 animate-in slide-in-from-top-5 duration-200">
                                {/* User Info in Dropdown */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-200">
                                            <Image
                                                src={SampleUserIcon}
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">suchao</p>
                                            <p className="text-sm text-gray-500">admin@goodmeal.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <button
                                        onClick={handleProfileClick}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                    >
                                        <Icon icon="mdi:account-edit" className="w-5 h-5" />
                                        <span>จัดการโปรไฟล์</span>
                                    </button>
                                    
                                   
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Icon icon="mdi:logout" className="w-5 h-5" />
                                            <span>ออกจากระบบ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}