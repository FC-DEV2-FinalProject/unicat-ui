import { Button } from "@/src/components/common/Button";

export default function NextButton() {
    return (
        <Button
            className="h-20 px-20 py-10 bg-gray-2 rounded-[15px] text-white
                       font-bold text-[24px] hover:bg-gray-3 transition-colors"
        >
            이전으로
        </Button>
    );
}
