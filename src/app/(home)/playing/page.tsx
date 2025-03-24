"use client";

import React from "react";

const dummyVideoUrl =
  "https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/public/video/uploads/f108e375-9130-4cb5-84c1-89c95249cb7f.mp4";

export default function VideoPlayer() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="h-[90vh] w-auto">
        <video
          className="h-full rounded-lg"
          controls
          src={dummyVideoUrl}
        />
      </div>
    </div>
  );
}
