// components/ui/card.tsx
import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a] ${className}`}>
            {children}
        </div>
    );
};

export const CardContent = ({ children, className }: CardProps) => {
    return <div className={`p-6 ${className}`}>{children}</div>;
};
