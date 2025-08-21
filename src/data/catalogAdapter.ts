// os1000/src/data/catalogAdapter.ts
import type { Catalog, Track } from "../shared/types/catalog";

export function normalizeCatalog(raw: any): Catalog {
  const normalizeTrack = (t: any): Track => ({
    id: t.id ?? `${raw?.currentAlbum?.slug ?? ''}:${t.slug}`,
    slug: t.slug,
    title: t.title,
    duration: t.duration,
    video_url: t.video_url ?? t.videoUrl ?? t.youtube_url ?? t.youtubeUrl ?? undefined,
    streaming: t.streaming ?? {
      youtube: t.youtube ?? undefined,
      spotify: t.spotify ?? undefined,
      apple: t.apple ?? undefined,
      bandcamp: t.bandcamp ?? undefined,
    },
  });

  return {
    version: raw.version ?? "v0.0.0",
    albums: (raw.albums ?? []).map((a: any) => ({
      slug: a.slug,
      title: a.title,
      releaseDate: a.releaseDate,
      coverUrl: a.coverUrl,
      tracks: (a.tracks ?? []).map(normalizeTrack),
    })),
  };
}