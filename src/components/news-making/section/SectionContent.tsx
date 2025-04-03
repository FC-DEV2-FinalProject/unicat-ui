import React, { useRef, useState } from 'react';
import { Button } from '../button/CommonNewsMakingButton';
//import { createSection, updateSection } from '../api/CreateSectionAPI';
import { updateSection } from '../api/CreateSectionAPI';
import { useProjectStore } from '@/src/store/useNewsMakingStore';
import { VOICE_TYPES } from '@/src/types/voiceTypes';
import { TRANSITION_TYPES } from '@/src/types/transitionTypes';

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
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { currentProjectId } = useProjectStore();

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    // 이미지 로딩 완료 후 사이즈 조정
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    setIsImageLoading(false);
  };

  const handleImageClick = () => {
    if (!isProcessed) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLLMButtonClick = async () => {
    try {
      if (!currentProjectId) return;

      setIsImageLoading(true);
      
      // TODO: 나중에 FormData 처리 다시 추가 필요
      // 서버에 이미지 첨부 시 이미지 전달이 필요함
      // 현재는 JSON 요청만 처리하도록 임시로 수정됨
      
      // 이미지 첨부 여부와 관계없이 항상 JSON으로 요청
      const updateResponse = await updateSection(currentProjectId.toString(), {
        voiceModel: VOICE_TYPES[0].name,
        alt: "Image alt text",
        script: script,
        transitionName: TRANSITION_TYPES[0].name
      });

      setIsProcessed(true);
      setProcessedScript(updateResponse.script || script);
      // 이미지 URL이 있으면 업데이트 (서버에서 반환된 경우)
      if (updateResponse.imageUrl) {
        setSelectedImage(updateResponse.imageUrl);
      }
      if (updateResponse.id) {
        onSectionIdUpdate(index, updateResponse.id);
      }
    } catch (error) {
      console.error('Failed to process section:', error);
      setIsImageLoading(false);
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
            <>
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <img
                src={selectedImage}
                alt="선택된 이미지"
                className={`w-full h-full object-contain ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'black' }}
                onLoad={handleImageLoad}
              />
            </>
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
        <Button 
          variant="outline" 
          size="sm" 
          className="w-[120px] h-[40px]"
          onClick={handleLLMButtonClick}
        >
          LLM 수정 버튼
        </Button>
      </div>
    </div>
  );
}; 