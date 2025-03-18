import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/src/components/common/navigation-menu";
import React, { JSX } from "react";
import Image from "next/image";

// Define navigation items for better maintainability
const navigationItems = [
    { id: "dashboard", label: "대시보드", active: true },
    { id: "statistics", label: "통계", active: false },
];

const Header = (): JSX.Element => {
    return (
        <header className="flex flex-col items-center w-full border-b border-[#ECECEC]">
            <div className="w-full h-[100px] bg-basewhite border-b border-[#ECECEC]">
                <div className="container flex items-center justify-between h-full max-w-[1200px] mx-auto px-4">
                    <div className="flex items-center gap-11">
                        {/* Logo */}
                        <Image className="h-[23.22px] text-purple-1" alt="AINEWS" src="/images/LOGO.png" width={127} height={24} />

                        {/* Navigation */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-11 flex-nowrap">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.id} className="relative">
                                        <NavigationMenuLink
                                            href={`#${item.id}`}
                                            className="text-gray-5 font-bold text-[24px] font-bold"
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Subscribe Button */}
                        <div
                            id="버튼 영역 추후 변경"
                            className="w-[148px] h-[52px] bg-purple-1 rounded-lg text-white font-bold text-[24px] hover:bg-purple-2 flex items-center justify-center"
                        >
                            구독하기
                        </div>

                        {/* User Avatar */}
                        <div className="p-1">
                            <div id="Avatar layer" className="w-9 h-9"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
