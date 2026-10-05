import Link from "next/link";

interface SponsorBannerProps {
  sponsorName?: string;
  sponsorLink?: string;
  copyLine1?: string;
  copyLine2?: string;
  ctaText?: string;
  ctaLink?: string;
}

const defaults: SponsorBannerProps = {
  sponsorName: "Hostinger",
  sponsorLink: "https://hostinger.com/cheatsheets",
  copyLine1: "Sponsored by Hostinger — reliable hosting for dev tools & docs sites.",
  copyLine2: "Build and deploy your own cheatsheets in minutes.",
  ctaText: "Try it free →",
  ctaLink: "https://hostinger.com/cheatsheets",
};

export default function SponsorBanner({
  sponsorName,
  sponsorLink,
  copyLine1,
  copyLine2,
  ctaText,
  ctaLink,
}: SponsorBannerProps = defaults) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cheatsheets.countrysnews.com";

  return (
    <div
      className="w-full text-center py-1.5 px-4"
      style={{ background: "var(--light-mint)", color: "var(--dark-green)" }}
    >
      <p className="text-[12px] font-medium inline-flex items-center gap-2 flex-wrap justify-center">
        <span>
          {copyLine1}{" "}
          <Link href={sponsorLink ?? "#"} target="_blank" rel="noopener noreferrer" className="font-semibold hover:opacity-75 transition-opacity underline underline-offset-2" style={{ color: "var(--dark-green)" }}>
            {sponsorName}
          </Link>
        </span>
        <span className="hidden sm:inline opacity-40">·</span>
        <span className="hidden sm:inline">{copyLine2}</span>
        <Link
          href={ctaLink ?? sponsorLink ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[12px] font-bold bg-dark-green text-white px-3 py-0.5 rounded-full hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </Link>
      </p>
    </div>
  );
}
