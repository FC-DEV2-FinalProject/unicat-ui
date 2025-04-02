import VoiceDropdown from "@/src/components/news-making/VoiceDropdown";
import type { DashboardDetail } from "@/src/types/dashboardDetailTypes";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const images = [
  {
    id: 1,
    url: "https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-8096234655908682540.png",
    description:
      "안녕하십니까. 이제 영상 제작은 전문가만의 영역이 아닙니다. 누구나 단 몇 초 만에 숏폼 영상을 만들 수 있는 시대입니다.",
  },
  {
    id: 2,
    url: "https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-10987310603388438144.png",
    description:
      "유니캣은 AI 기술로 키워드 하나만 입력하면 이미지, 음악, 템플릿까지 자동으로 구성된 영상을 완성합니다.",
  },
  {
    id: 3,
    url: "https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/image/upload-9060809286912031668.png",
    description:
      "복잡한 편집 없이, 클릭 한 번이면 충분합니다. 지금 이 순간에도 많은 사람들이 유니캣으로 새로운 콘텐츠를 만들어가고 있습니다. 창작의 자유, 그 중심에 유니캣이 있습니다. 창작의 자유, 그 중심에 유니캣이 있습니다.",
  },
];

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
          src="/images/news-making/news-style-aivatar.png"
          alt="뉴스 스타일 1"
          className="w-full h-full object-cover"
        />
        <VoiceDropdown className="absolute bottom-0 right-0 mt-4" />
      </div>
      <div className="w-[70%] h-full flex flex-col gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="w-full h-[200px] shadow-md rounded-lg flex"
          >
            <div className="w-[200px] min-w-[200px] bg-[#1A1A1A] h-full rounded-lg overflow-hidden flex items-center justify-center">
              <img src={image.url} alt="뉴스 스타일 1" />
            </div>
            <p className="text-md p-4">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
