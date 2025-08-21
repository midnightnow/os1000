// os1000/src/players/embed.ts
export function buildEmbed(url: string): { src: string; title: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');

    // YouTube
    if (host.includes('youtube.com') || host === 'youtu.be') {
      const id = host === 'youtu.be'
        ? u.pathname.slice(1)
        : u.searchParams.get('v');
      if (!id) return null;
      return { src: `https://www.youtube.com/embed/${id}`, title: 'YouTube Player' };
    }

    // Vimeo
    if (host.includes('vimeo.com')) {
      const idMatch = u.pathname.match(/\/(\d+)/);
      const id = idMatch?.[1];
      if (!id) return null;
      return { src: `https://player.vimeo.com/video/${id}`, title: 'Vimeo Player' };
    }

    // Fallback: open as external
    return null;
  } catch {
    return null;
  }
}