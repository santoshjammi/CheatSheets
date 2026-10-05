"use client";

import { useEffect, useRef } from "react";

/**
 * AdSlot — Google AdSense display unit.
 *
 * Reads the publisher id from NEXT_PUBLIC_ADSENSE_CLIENT at build time. When it
 * is unset the component renders nothing (no empty box, no broken layout), so
 * the site is safe to deploy before AdSense is configured.
 *
 * Usage: <AdSlot slot="home-below-hero" size="horizontal" />
 */
type AdSize = "horizontal" | "rectangle" | "vertical";

const SIZES: Record<AdSize, { minHeight: number; label: string }> = {
  horizontal: { minHeight: 90, label: "horizontal" },
  rectangle: { minHeight: 250, label: "rectangle" },
  vertical: { minHeight: 600, label: "vertical" },
};

export default function AdSlot({
  slot,
  size = "horizontal",
  className = "",
}: {
  slot: string;
  size?: AdSize;
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* script not ready — it will push on load */
    }
  }, [client]);

  if (!client) return null;

  const { minHeight, label } = SIZES[size];

  return (
    <div
      className={`w-full my-8 flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight }}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="off"
        title={`ad-${label}`}
      />
    </div>
  );
}
