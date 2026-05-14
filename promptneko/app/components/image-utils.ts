const OPTIMIZED_IMAGE_WIDTH = 384;
const OPTIMIZED_PREVIEW_WIDTH = 768;
const OPTIMIZED_IMAGE_QUALITY = 68;

function canUseNextImageOptimizer(url?: string) {
  return Boolean(url && url.startsWith("/") && !url.startsWith("/_next/"));
}

export function optimizedThumbnailUrl(url?: string, width = OPTIMIZED_IMAGE_WIDTH) {
  if (!url) return "/main.png";
  if (!canUseNextImageOptimizer(url)) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${OPTIMIZED_IMAGE_QUALITY}`;
}

export function optimizedPreviewUrl(url?: string) {
  return optimizedThumbnailUrl(url, OPTIMIZED_PREVIEW_WIDTH);
}
