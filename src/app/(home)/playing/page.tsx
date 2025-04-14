"use client";

import React from "react";

const dummyVideoUrl =
  "https://bhqvrnbzzqzqlwwrcgbm.supabase.co/storage/v1/object/video/unicat_uploads5062518131803051835.mp4";

export default function VideoPlayer() {
  return (
    <div className="flex flex-col items-center mt-10 min-h-screen">
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
