"use client"; // ✅ 클라이언트 컴포넌트 지정

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/src/components/common/navigation-menu";
import React, { JSX } from "react";
import Image from "next/image";

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
                        <Image
                            alt="AINEWS"
                            src="/images/logo.png"
                            width={127}
                            height={24}
                            priority
                        />

                        {/* Navigation */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-11 flex-nowrap">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.id} className="relative">
                                        <NavigationMenuLink
                                            href={`#${item.id}`}
                                            className="text-gray-5 font-bold text-[24px]"
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Subscribe Button */}
                        <div
                            id="버튼 영역 추후 변경"
                            className="w-[148px] h-[52px] bg-purple-1 rounded-lg text-white font-bold text-[24px] hover:bg-purple-2 flex items-center justify-center"
                        >
                            구독하기
                        </div>

                        {/* User Avatar */}
                        <div className="p-1">
                            <Image
                                alt="avatar"
                                src="/images/avatar.png"
                                width={36}
                                height={36}
                                className="w-[36px] h-[36px] rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
