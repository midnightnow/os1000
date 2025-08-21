// os1000/src/terminal/state/catalog.ts
import type { Catalog } from "../../shared/types/catalog";
import { normalizeCatalog } from "../../data/catalogAdapter";

let catalogCache: Catalog | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCatalog(): Promise<Catalog> {
  const now = Date.now();
  
  // Return cached catalog if still fresh
  if (catalogCache && (now - lastFetch) < CACHE_DURATION) {
    return catalogCache;
  }
  
  try {
    // Try to fetch from Firestore registry
    const response = await fetch('/api/v1/catalog');
    if (response.ok) {
      const rawCatalog = await response.json();
      catalogCache = normalizeCatalog(rawCatalog);
      lastFetch = now;
      return catalogCache;
    }
  } catch (error) {
    console.warn('Failed to fetch catalog from registry:', error);
  }
  
  // Fallback to hardcoded OS1000 tracks if registry is unavailable
  const fallbackCatalog: Catalog = {
    version: "v1.0.0",
    albums: [{
      slug: "os1000",
      title: "OS 1000",
      releaseDate: "2025-01-01",
      release_status: "live",
      tracks: [
        {
          id: "os1000:intro-os-overture",
          slug: "intro-os-overture", 
          title: "Intro (The OS Overture)",
          duration: 221,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: "os1000:getting-started",
          slug: "getting-started",
          title: "Getting Started", 
          duration: 205,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: "os1000:risc-v-101",
          slug: "risc-v-101",
          title: "RISC-V 101",
          duration: 190,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: "os1000:kernel-panic",
          slug: "kernel-panic",
          title: "Kernel Panic",
          duration: 252,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: "os1000:memory-allocation",
          slug: "memory-allocation", 
          title: "Memory Allocation",
          duration: 255,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          id: "os1000:system-call",
          slug: "system-call",
          title: "System Call", 
          duration: 224,
          video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]
    }]
  };
  
  catalogCache = fallbackCatalog;
  lastFetch = now;
  return catalogCache;
}

export function invalidateCache() {
  catalogCache = null;
  lastFetch = 0;
}