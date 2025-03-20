// components/StepIndicator.tsx
interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="text-[24px] font-bold leading-[28px]">
            <span className="text-purple-1">{currentStep}</span>
            <span className="text-gray-5">/{totalSteps}</span>
        </div>
    );
}
