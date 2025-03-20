import { Button } from "@/src/components/common/Button";

export default function NextButton() {

    return (
        <Button
            className="h-20 px-20 py-10 rounded-[15px] text-white font-bold text-[24px]
                      bg-gray-2 hover:bg-purple-1 transition-colors"
        >
            다음으로
        </Button>
    );
}