import { Button } from "@/src/components/common/Button";

export default function SubscribeButton() {

    return (
        <Button
            className="w-[148px] h-[52px] bg-purple-1 rounded-lg text-white
                       font-bold text-[24px] hover:bg-purple-2 flex items-center justify-center"
        >
            구독하기
            </Button>
    );
}