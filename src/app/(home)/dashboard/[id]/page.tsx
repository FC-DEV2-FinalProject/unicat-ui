import VoiceDropdown from "@/src/components/news-making/VoiceDropdown";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardDetail({ params }: PageProps) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="flex w-[1200px] max-w-[1200px] mx-auto gap-4 my-4">
      <div className="w-[30%] h-full rounded-lg overflow-hidden p-5 shadow-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          사용한 영상 스타일
        </h2>
        <img
          src="/images/news-making/news-style-1.png"
          alt="뉴스 스타일 1"
          className="w-full h-full object-cover"
        />
        <VoiceDropdown className="absolute bottom-0 right-0 mt-4" />
      </div>
      <div className="w-[70%] h-full flex flex-col gap-4">
        <div className="w-full h-[200px] shadow-md rounded-lg">
          <div className="w-[200px] bg-blue-200 h-full rounded-lg overflow-hidden">
            {/* 예시 이미지 */}
            <img
              src="/images/news-making/news-style-1.png"
              alt="뉴스 스타일 1"
            />
          </div>
        </div>
        <div className="w-full h-[200px] shadow-md rounded-lg">
          <div className="w-[200px] bg-blue-200 h-full rounded-lg overflow-hidden">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
        <div className="w-full h-[200px] shadow-md rounded-lg">
          <div className="w-[200px] bg-blue-200 h-full rounded-lg overflow-hidden">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
        <div className="w-full h-[200px] shadow-md rounded-lg">
          <div className="w-[200px] bg-blue-200 h-full rounded-lg overflow-hidden">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
        <div className="w-full h-[200px] shadow-md rounded-lg">
          <div className="w-[200px] bg-blue-200 h-full rounded-lg overflow-hidden">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
