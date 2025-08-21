import { gtagEvent } from '../../telemetry/ga4';

export function streamCommand(args: string[]): string {
  const albumSlug = args[0];
  
  gtagEvent('os1000_command_stream', {
    album_slug: albumSlug || 'all',
    source: 'os1000'
  });

  if (!albumSlug) {
    return `🎵 Luna Darkside Streaming Links

Visit the portal for complete platform access:
→ https://luna-darkside.web.app/music

Albums available:
  os1000               Operating System as Performance Art
  singularity-2025     Singularity 2025
  resort               Resort

Usage: stream <album-slug> (for specific album links)`;
  }

  if (albumSlug === 'os1000') {
    return `🎵 OS1000 - Operating System as Performance Art

Complete 18-track album available on all platforms:
→ https://luna-darkside.web.app/music/os1000

Quick links:
  YouTube Playlist: https://www.youtube.com/playlist?list=OLAK5uy_nwxlvSsjdmPqt5fMzvyTP-UnQ2zoscbCk
  Spotify: Available on portal
  Apple Music: Available on portal

Track count: 18 tracks • Status: LIVE`;
  }

  if (albumSlug === 'singularity-2025') {
    return `🎵 Singularity 2025

Streaming links available on the Luna Darkside portal:
→ https://luna-darkside.web.app/music/singularity-2025

Platform links:
  Spotify, Apple Music, YouTube Music, and more
  
Track count: 12 tracks • Status: LIVE`;
  }

  if (albumSlug === 'resort') {
    return `🎵 Resort

Streaming links available on the Luna Darkside portal:
→ https://luna-darkside.web.app/music/resort

Track count: 8 tracks • Status: LIVE`;
  }

  return `Album "${albumSlug}" not found.

Available albums:
  os1000
  singularity-2025
  resort

Or visit: https://luna-darkside.web.app/music`;
}