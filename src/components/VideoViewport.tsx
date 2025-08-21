// os1000/src/components/VideoViewport.tsx
import React from "react";

export const VideoViewport: React.FC<{
  src: string; title?: string; externalUrl?: string;
}> = ({ src, title = "Player", externalUrl }) => (
  <div className="viewport border rounded-xl overflow-hidden">
    <div className="aspect-video">
      <iframe
        className="w-full h-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    {externalUrl && (
      <div className="p-3 text-sm opacity-80">
        Prefer a new tab? <a className="underline" href={externalUrl} target="_blank" rel="noreferrer">Watch on source</a>
      </div>
    )}
  </div>
);