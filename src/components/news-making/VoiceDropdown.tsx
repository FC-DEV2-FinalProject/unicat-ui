"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/src/components/news-making/button/CommonNewsMakingButton";

interface VoiceDropdownProps {
  className?: string;
}

export default function VoiceDropdown({ className = "" }: VoiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("10대 목소리");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + 8,
        left: buttonRect.left,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (voice: string) => {
    setSelectedVoice(voice);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        className="flex items-center gap-1 min-w-[110px]"
        onClick={toggleDropdown}
      >
        <ChevronDownIcon className="h-4 w-4" />
        <span className="truncate">{selectedVoice}</span>
      </Button>

      {isOpen && (
        <div
          className="fixed w-40 bg-white border rounded-md shadow-lg z-50"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul className="py-2 text-sm text-gray-700 w-full h-32 overflow-auto">
            {["10대 목소리", "20대 목소리", "30대 목소리"].map((voice) => (
              <li
                key={voice}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(voice)}
              >
                {voice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
