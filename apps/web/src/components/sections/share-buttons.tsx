'use client';

import { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';

type ShareButtonsProps = {
  title: string;
};

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  async function handleShare() {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch {
      // user cancelled or browser denied
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied
    }
  }

  return (
    <div className="flex items-center gap-2">
      {canShare ? (
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-md border border-brand-warm-white/20 px-3 py-1.5 text-xs font-semibold text-brand-warm-white/70 transition-colors hover:bg-brand-warm-white/10 hover:text-brand-warm-white"
        >
          <Share2 aria-hidden="true" className="size-3.5" />
          Share
        </button>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-brand-warm-white/20 px-3 py-1.5 text-xs font-semibold text-brand-warm-white/70 transition-colors hover:bg-brand-warm-white/10 hover:text-brand-warm-white"
        aria-live="polite"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-3.5 text-green-400" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
