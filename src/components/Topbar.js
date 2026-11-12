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
        <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center sm:px-6 sticky top-0 z-10">
            <div className="flex w-full justify-between items-center">
                {/* Left Section: Toggle Button and Title */}
                <div className="flex items-center space-x-4">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? 'ย่อเมนู' : 'ขยายเมนู'}
                        aria-expanded={isSidebarOpen}
                        className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 transition-colors duration-200"
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
                    <div className="text-right hidden sm:block leading-tight">
                        <p className="text-gray-900 font-semibold">suchao</p>
                        <p className="text-xs text-brand-600 font-medium">Admin</p>
                    </div>

                    {/* Profile Picture with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            aria-label="เมนูผู้ใช้"
                            aria-haspopup="menu"
                            aria-expanded={isDropdownOpen}
                            className="block w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-1 ring-gray-200 hover:ring-gray-300 transition-all duration-200"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onKeyDown={(e) => e.key === 'Escape' && setIsDropdownOpen(false)}
                        >
                            <Image
                                src={SampleUserIcon}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
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
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
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