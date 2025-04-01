import React, { useRef, useState } from 'react';
import { Button } from '../button/CommonNewsMakingButton';
//import { createSection, updateSection } from '../api/CreateSectionAPI';
import { updateSection } from '../api/CreateSectionAPI';
import { useProjectStore } from '@/src/store/useNewsMakingStore';
import { VOICE_TYPES } from '@/src/types/voiceTypes';
import { TRANSITION_TYPES } from '@/src/types/transitionTypes';

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

interface SectionContentProps {
  index: number;
  title: string;
  script: string;
  onScriptChange: (index: number, value: string) => void;
  onSectionIdUpdate: (index: number, id: number) => void;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  index,
  script,
  onScriptChange,
  onSectionIdUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processedScript, setProcessedScript] = useState<string>('');
  const { currentProjectId } = useProjectStore();

  const handleImageClick = () => {
    if (!isProcessed) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleLLMButtonClick = async () => {
    try {
      if (!currentProjectId) return;

      // 1. 섹션 생성 API 호출
      // const response = await createSection(currentProjectId.toString());
      // if (!response?.id) {
      //   throw new Error('Failed to create section: No id received');
      // }

      // api 변경으로 인한 함수 변경
      // 2. 섹션 업데이트 API 호출
      let updateResponse;
      if (selectedImage) {
        // 이미지를 PNG 파일로 변환
        const imageFile = dataURLtoFile(selectedImage, 'image.png');
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('script', script);
        formData.append('alt', '');
        updateResponse = await updateSection(currentProjectId.toString(),  formData);
      } else {
        // 이미지가 없는 경우 JSON으로 전송
        updateResponse = await updateSection(currentProjectId.toString(), {
          voiceModel: VOICE_TYPES[0].name,
          alt: "Image alt text",
          script: script,
          transitionName: TRANSITION_TYPES[0].name
        });
      }

      // 3. UI 업데이트
      setIsProcessed(true);
      setProcessedScript(updateResponse.script || script);
      if (updateResponse.imageUrl) {
        setSelectedImage(updateResponse.imageUrl);
      }
      if (updateResponse.id) {
        onSectionIdUpdate(index, updateResponse.id);
      }
    } catch (error) {
      console.error('Failed to process section:', error);
    }
  };

  return (
    <div className="flex w-full max-w-[773px] h-[300px] border rounded-lg shadow-sm overflow-hidden">
      <div 
        className={`w-1/3 flex items-center justify-center relative ${selectedImage ? 'bg-black' : 'bg-gray-200'} ${!isProcessed ? 'cursor-pointer' : ''}`}
        onClick={handleImageClick}
      >
        <div className={`relative w-full h-[200px] rounded-lg overflow-hidden ${selectedImage ? 'bg-black' : ''}`}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="선택된 이미지"
              className="w-full h-full object-contain"
              style={{ backgroundColor: 'black' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <p>이미지를 선택하세요</p>
            </div>
          )}
        </div>
        {!isProcessed && (
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
      </div>
      <div className="w-2/3 bg-white p-4 flex flex-col justify-between">
        {isProcessed ? (
          <div className="w-full h-full p-2 text-gray-600">
            {processedScript}
          </div>
        ) : (
          <textarea
            className="w-full h-full p-2 resize-none focus:outline-none"
            placeholder="텍스트를 입력하세요..."
            value={script}
            onChange={(e) => onScriptChange(index, e.target.value)}
          />
        )}
        {!isProcessed && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-[120px] h-[40px]"
            onClick={handleLLMButtonClick}
          >
            LLM 수정 버튼
          </Button>
        )}
      </div>
    </div>
  );
}; 