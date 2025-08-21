import React from 'react';
import { VideoEmbed } from '../players/embed';
import { trackVideoEvent } from '../telemetry/ga4';

interface VideoViewportProps {
  embed?: VideoEmbed;
  isVisible: boolean;
  onClose: () => void;
  trackTitle?: string;
}

export const VideoViewport: React.FC<VideoViewportProps> = ({
  embed,
  isVisible,
  onClose,
  trackTitle = 'Unknown Track'
}) => {
  if (!isVisible || !embed || embed.type === 'unsupported') {
    return null;
  }

  const handleLoad = () => {
    trackVideoEvent('video_start', {
      video_title: trackTitle,
      video_url: embed.originalUrl,
      embed_type: embed.type
    });
  };

  const handleClose = () => {
    trackVideoEvent('video_close', {
      video_title: trackTitle,
      video_url: embed.originalUrl
    });
    onClose();
  };

  return (
    <div className="video-viewport" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#000',
      padding: '1rem',
      borderBottom: '2px solid #FFD700'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{ color: '#FFD700', margin: 0, fontSize: '1.2rem' }}>
          ▶ {trackTitle}
        </h3>
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: '1px solid #FFD700',
            color: '#FFD700',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ✕ Close
        </button>
      </div>

      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden'
      }}>
        {embed.type === 'direct' ? (
          <video
            src={embed.embedUrl}
            controls
            autoPlay
            onLoadStart={handleLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        ) : (
          <iframe
            src={embed.embedUrl}
            frameBorder="0"
            allowFullScreen
            onLoad={handleLoad}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </div>

      <div style={{
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#888',
        textAlign: 'center'
      }}>
        Press ESC or click Close to return to terminal
      </div>
    </div>
  );
};