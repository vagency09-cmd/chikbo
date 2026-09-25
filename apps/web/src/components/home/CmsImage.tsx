import { useEffect, useState } from 'react';
import { assetUrl } from '../../lib/format';
import { fetchPriorityAttr } from '../../lib/seo';
import { SilkArt } from '../SilkArt';

interface Props {
  /** Server-relative (`/uploads/...`) or absolute URL from the CMS. */
  url: string | null | undefined;
  /** Narrow-viewport crop, used below 768px when present. */
  mobileUrl?: string | null;
  /** Description of the image — always supply one; it is what Google Images reads. */
  alt: string;
  /**
   * The surrounding copy already says this (a banner headline, a card title),
   * so hide the block from assistive tech to avoid a double announcement. The
   * `<img>` keeps its `alt` for crawlers.
   */
  decorative?: boolean;
  /** Seeds the SilkArt underlay so an image-less section still looks art-directed. */
  seed: string;
  category?: string | null;
  className?: string;
  loading?: 'lazy' | 'eager';
  /** `high` on the first hero slide — it is the home page's LCP element. */
  fetchPriority?: 'high' | 'low' | 'auto';
  objectPosition?: string;
}

/**
 * CMS banner/tile imagery. The uploaded photograph is shown as soon as the
 * browser has it; SilkArt stands in only when a slot has no image or the file
 * is missing, so it is never blank and never a broken-image glyph.
 */
export function CmsImage({
  url,
  mobileUrl,
  alt,
  decorative = false,
  seed,
  category,
  className,
  loading = 'lazy',
  fetchPriority,
  objectPosition,
}: Props) {
  // Whichever image the admin uploaded is better than none: a slot with only
  // a mobile crop shows that crop on every screen, and vice versa.
  const resolved = assetUrl(url) ?? assetUrl(mobileUrl);
  const resolvedMobile = assetUrl(mobileUrl);
  const [failed, setFailed] = useState(false);
  const hasImage = !!resolved && !failed;

  useEffect(() => setFailed(false), [resolved, resolvedMobile]);

  return (
    <div
      className={className ? `silk-media ${className}` : 'silk-media'}
      role={!decorative && !hasImage ? 'img' : undefined}
      aria-label={!decorative && !hasImage ? alt || undefined : undefined}
      aria-hidden={decorative || !alt ? true : undefined}
    >
      {!hasImage && <SilkArt seed={seed} category={category} showLabel={false} className="silk-media-art" />}
      {hasImage && (
        <picture>
          {resolvedMobile && resolvedMobile !== resolved && (
            <source media="(max-width: 767px)" srcSet={resolvedMobile} />
          )}
          <img
            className="silk-media-img"
            src={resolved}
            alt={alt}
            loading={loading}
            {...fetchPriorityAttr(fetchPriority)}
            style={objectPosition ? { objectPosition } : undefined}
            onError={() => setFailed(true)}
          />
        </picture>
      )}
    </div>
  );
}
