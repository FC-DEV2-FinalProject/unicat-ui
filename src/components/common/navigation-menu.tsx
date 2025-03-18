import React, { ReactNode } from "react";

// NavigationMenu 컴포넌트
export const NavigationMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <nav>{children}</nav>;
};

// NavigationMenuList 컴포넌트
export const NavigationMenuList: React.FC<{ children: ReactNode; className?: string }> = ({ children }) => {
    return <ul className="flex">{children}</ul>;
};

// NavigationMenuItem 컴포넌트
export const NavigationMenuItem: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
    return <li className={`${className} mr-4`}>{children}</li>;
};

// NavigationMenuLink 컴포넌트 (href 필수)
export const NavigationMenuLink: React.FC<{ href: string; children: ReactNode; className?: string }> = ({ children, href, className }) => {
    return (
        <a href={href} className={`text-blue-500 hover:text-blue-700 ${className}`}>
            {children}
        </a>
    );
};