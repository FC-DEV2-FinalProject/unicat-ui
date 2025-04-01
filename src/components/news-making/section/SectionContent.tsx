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

      setIsImageLoading(true);
      let updateResponse;
      if (selectedImage) {
        const imageFile = dataURLtoFile(selectedImage, 'image.png');
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('script', script);
        formData.append('alt', '');
        updateResponse = await updateSection(currentProjectId.toString(), formData);
      } else {
        updateResponse = await updateSection(currentProjectId.toString(), {
          voiceModel: VOICE_TYPES[0].name,
          alt: "Image alt text",
          script: script,
          transitionName: TRANSITION_TYPES[0].name
        });
      }

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