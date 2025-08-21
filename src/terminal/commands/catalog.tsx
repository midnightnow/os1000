import { gtagEvent } from '../../telemetry/ga4';

export function catalogCommand(): string {
  gtagEvent('os1000_command_catalog', { source: 'os1000' });

  return `🎵 Luna Darkside Complete Catalog

📀 OS1000 - Operating System as Performance Art
   2025 • 18 tracks • LIVE
   
   Featured tracks:
     play boot-sequence       Track 01 - Boot Sequence
     play digital-awakening   Track 02 - Digital Awakening  
     play quantum-self        Track 03 - Quantum Self
     ... +15 more tracks
   
   → https://luna-darkside.web.app/music/os1000

📀 Singularity 2025
   2025 • 12 tracks • LIVE
   
   Featured tracks:
     play pure-light          Pure Light
     play uncanny-valley      Uncanny Valley
     play higher              Higher
   
   → https://luna-darkside.web.app/music/singularity-2025

📀 Resort
   2024 • 8 tracks • LIVE
   
   → https://luna-darkside.web.app/music/resort

Usage:
  play <track-slug>     Play track with video
  stream <album-slug>   Get streaming links
  portal               Visit Luna Darkside portal`;
}