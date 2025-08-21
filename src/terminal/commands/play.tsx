import React from 'react';
import { processVideoUrl, canEmbed } from '../../players/embed';
import { VideoViewport } from '../../components/VideoViewport';
import { trackPlayCommand, gtagEvent } from '../../telemetry/ga4';

// Mock catalog data - replace with actual catalog fetch
const tracks = [
  {
    id: '01',
    title: 'Track 01 - Boot Sequence',
    slug: 'boot-sequence',
    length: '4:00',
    date: '2025-05-25',
    status: 'ONLINE',
    videoUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_nwxlvSsjdmPqt5fMzvyTP-UnQ2zoscbCk&index=1',
    thumbnail: '/thumbnails/01.jpg'
  },
  {
    id: '02',
    title: 'Track 02 - Digital Awakening',
    slug: 'digital-awakening',
    length: '3:45',
    date: '2025-05-25',
    status: 'ONLINE',
    videoUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_nwxlvSsjdmPqt5fMzvyTP-UnQ2zoscbCk&index=2',
    thumbnail: '/thumbnails/02.jpg'
  },
  {
    id: '03',
    title: 'Track 03 - Quantum Self',
    slug: 'quantum-self',
    length: '4:15',
    date: '2025-05-25',
    status: 'ONLINE',
    videoUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_nwxlvSsjdmPqt5fMzvyTP-UnQ2zoscbCk&index=3',
    thumbnail: '/thumbnails/03.jpg'
  }
];

export async function playCommand(
  args: string[],
  setViewport: (component: React.ReactNode) => void,
  println: (message: string) => void
): Promise<void> {
  const slug = args[0];
  
  if (!slug) {
    println(`Usage: play <track-slug>
    
Available tracks:
  boot-sequence        digital-awakening    quantum-self
  uncanny-valley       pure-light           higher
  
Type 'catalog' to see all albums and tracks.`);
    return;
  }

  gtagEvent('os1000_command_play', { 
    track_slug: slug, 
    source: 'os1000',
    timestamp: Date.now()
  });

  try {
    // Find the track
    const track = tracks.find(t => t.slug === slug || t.id === slug);

    if (!track) {
      trackPlayCommand(slug, false, { reason: 'track_not_found' });
      println(`Track "${slug}" not found. 

Try: catalog (to see all tracks)
Or:  help (for available commands)`);
      return;
    }

    // Embed-first video playback
    if (track.videoUrl && canEmbed(track.videoUrl)) {
      const embed = processVideoUrl(track.videoUrl);
      
      if (embed.type !== 'unsupported') {
        trackPlayCommand(slug, true, {
          embed_type: embed.type,
          video_url: track.videoUrl
        });

        const videoViewport = (
          <VideoViewport
            embed={embed}
            isVisible={true}
            trackTitle={track.title}
            onClose={() => {
              setViewport(null);
              println(`Stopped playing: ${track.title}`);
            }}
          />
        );

        setViewport(videoViewport);
        println(`▶ Now Playing: ${track.title}`);
        return;
      }
    }

    // Graceful fallback → link back to Luna Darkside portal
    const luminaUrl = `https://luna-darkside.web.app/music/os1000#${slug}`;

    trackPlayCommand(slug, false, {
      reason: track.videoUrl ? 'embed_failed' : 'no_video_url',
      fallback_url: luminaUrl
    });

    println(`🎵 ${track.title}

No embeddable video available for this track.
You can listen on the Luna Darkside portal:

→ ${luminaUrl}

Or try: stream os1000 (for all platform links)`);

  } catch (error) {
    trackPlayCommand(slug, false, {
      reason: 'error',
      error: (error as Error).message
    });

    println(`Error loading track "${slug}". 

Try: catalog (to refresh the track list)
Or:  portal (to visit Luna Darkside)`);
  }
}