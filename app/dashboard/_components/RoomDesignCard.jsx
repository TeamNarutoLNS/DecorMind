'use client';
import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function RoomDesignCard({ room, onAnalyze }) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const onClickHandler = (event) => {
    if (event.target.tagName !== 'BUTTON') {
      setOpenDialog(true);
    }
  };

  const closeDialog = (isOpen) => {
    setOpenDialog(isOpen);
  };

  const handleAnalyzeClick = (imageUrl) => {
    try {
      console.log('RoomDesignCard handleAnalyzeClick, calling onAnalyze with:', imageUrl);
      onAnalyze(imageUrl);
      router.push('/DetectFurniture');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div
      className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer duration-300"
      onClick={onClickHandler}
    >
      {room?.aiImage && room?.orgImage ? (
        <div className="w-full max-w-full overflow-hidden">
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: room.aiImage }}
            secondImage={{ imageUrl: room.orgImage }}
          />
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-400 text-sm italic">
          Image preview not available
        </div>
      )}

      <div className="p-4 bg-gray-50">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
          🏠 Room Type: <span className="font-normal">{room.roomType}</span>
        </h3>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          🎨 Design Type: <span className="font-normal">{room.designType}</span>
        </h3>

        <Button
          className="mt-4 py-2 px-4 rounded-md font-medium transition duration-300 w-full sm:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleAnalyzeClick(room.aiImage);
          }}
        >
          Analyze Furniture
        </Button>
      </div>

      <AiOutputDialog
        orgImage={room.orgImage}
        aiImage={room.aiImage}
        openDialog={openDialog}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default RoomDesignCard;
