export interface VideoEmbed {
  type: 'youtube' | 'vimeo' | 'direct' | 'unsupported';
  embedUrl: string;
  originalUrl: string;
  videoId?: string;
}

export function processVideoUrl(url: string): VideoEmbed {
  // YouTube detection and conversion
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      originalUrl: url,
      videoId
    };
  }

  // Vimeo detection and conversion
  const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const vimeoMatch = url.match(vimeoRegex);
  
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      originalUrl: url,
      videoId
    };
  }

  // Direct video file detection
  const videoExtensions = /\.(mp4|webm|ogg|mov)$/i;
  if (videoExtensions.test(url)) {
    return {
      type: 'direct',
      embedUrl: url,
      originalUrl: url
    };
  }

  // Unsupported format
  return {
    type: 'unsupported',
    embedUrl: '',
    originalUrl: url
  };
}

export function canEmbed(url: string): boolean {
  const result = processVideoUrl(url);
  return result.type !== 'unsupported';
}

// Legacy function for backward compatibility
export function buildEmbed(url: string): { src: string; title: string } | null {
  const result = processVideoUrl(url);
  if (result.type !== 'unsupported') {
    return { src: result.embedUrl, title: `${result.type} Player` };
  }
  return null;
}