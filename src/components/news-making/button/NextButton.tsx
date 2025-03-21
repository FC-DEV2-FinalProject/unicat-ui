interface ButtonProps {
    onClick?: () => void;
    className?: string;
}

export default function NextButton({ onClick, className }: ButtonProps) {
    return (
      <button
        className={`w-[268px] h-[80px] bg-gray-2 rounded-[15px] text-white font-bold text-[24px] 
                        hover:bg-purple-1 transition-colors ${className}`}
        onClick={onClick}
      >
          다음으로
      </button>
    );
}