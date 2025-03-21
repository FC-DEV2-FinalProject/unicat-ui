interface ButtonProps {
    onClick?: () => void;
    className?: string;
}

export default function PreviewButton({ onClick, className }: ButtonProps) {
    return (
      <button
        className={`w-[268px] h-[80px] bg-white border-2 border-purple-1 rounded-[15px] 
                        text-purple-1 font-bold text-[24px] hover:bg-purple-100 transition-colors ${className}`}
        onClick={onClick}
      >
          이전으로
      </button>
    );
}