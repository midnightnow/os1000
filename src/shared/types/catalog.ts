// shared/types/catalog.ts
export type StreamingLinks = {
  spotify?: string;
  apple?: string;
  youtube?: string;
  bandcamp?: string;
  tidal?: string;
  amazon?: string;
  deezer?: string;
};

export type PlatformUrls = {
  spotify?: string;
  apple?: string;
  youtube?: string;
  tidal?: string;
  amazon?: string;
  deezer?: string;
  bandcamp?: string;
};

export type ReleaseStatus = 'announced' | 'pre_save' | 'live';
export type LinkSource = 'mft' | 'manual' | 'distrokid_hyperfollow';

export type Track = {
  id: string;            // e.g., "singularity-2025:sock-world"
  slug: string;          // e.g., "sock-world"
  title: string;
  duration?: number;     // seconds
  video_url?: string;    // canonical; embed-first uses this
  streaming?: StreamingLinks;
  // DistroKid integration fields
  isrc?: string;         // International Standard Recording Code
  distrokid_track_id?: string;
  platform_urls?: PlatformUrls;
  hyperfollow_url?: string;
  link_source?: LinkSource;
};

export type Album = {
  slug: string;          // "singularity-2025"
  title: string;
  releaseDate?: string;  // ISO
  coverUrl?: string;
  tracks: Track[];
  // DistroKid integration fields
  upc?: string;          // Universal Product Code
  distrokid_release_id?: string;
  hyperfollow_url?: string;
  release_status?: ReleaseStatus;
  missing_links?: string[];  // QA tracking for missing platform URLs
  updated_at?: string;   // Last sync timestamp
};

export type Catalog = {
  version: string;       // e.g., "v1.1.0"
  albums: Album[];
};