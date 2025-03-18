// components/ui/button.tsx
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
