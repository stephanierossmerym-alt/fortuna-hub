import { cn } from "@/lib/utils";

type BrandProps = {
  variant?: "full" | "monogram" | "wordmark";
  className?: string;
};

function Monogram({ className }: { className?: string }) {
  return (
    <svg className={cn("overflow-visible", className)} viewBox="0 0 180 180" role="img" aria-label="Monograma Ross Fortuna">
      <defs>
        <linearGradient id="rf-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-deep)" />
          <stop offset="0.28" stopColor="var(--gold)" />
          <stop offset="0.5" stopColor="var(--gold-light)" />
          <stop offset="0.72" stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>
      <circle cx="90" cy="98" r="59" fill="none" stroke="url(#rf-gold)" strokeWidth="5" />
      <path d="M51 47 42 21l27 15L90 10l21 26 27-15-9 26Z" fill="url(#rf-gold)" stroke="var(--gold-deep)" strokeWidth="2" />
      <circle cx="42" cy="20" r="5" fill="url(#rf-gold)" /><circle cx="90" cy="9" r="5" fill="url(#rf-gold)" /><circle cx="138" cy="20" r="5" fill="url(#rf-gold)" />
      <text x="58" y="132" fill="url(#rf-gold)" fontFamily="Cormorant Garamond, serif" fontSize="105" fontWeight="700">R</text>
      <g fill="url(#rf-gold)" transform="translate(48 93)">
        <circle cx="0" cy="-8" r="10" /><circle cx="9" cy="1" r="10" /><circle cx="0" cy="10" r="10" /><circle cx="-9" cy="1" r="10" />
      </g>
    </svg>
  );
}

export function Brand({ variant = "full", className }: BrandProps) {
  if (variant === "monogram") return <Monogram className={cn("h-14 w-14", className)} />;
  if (variant === "wordmark") {
    return <div className={cn("font-wordmark gold-text text-xl font-bold uppercase tracking-[0.16em]", className)}>Ross Fortuna</div>;
  }
  return (
    <div className={cn("flex flex-col items-center text-center", className)} aria-label="Ross Fortuna — Tu momento. Tu suerte. Tu fortuna.">
      <Monogram className="h-28 w-28 sm:h-36 sm:w-36" />
      <div className="font-wordmark gold-text -mt-4 text-5xl font-bold uppercase leading-none sm:text-7xl">Ross</div>
      <div className="mt-1 flex w-full max-w-72 items-center gap-3">
        <span className="h-px flex-1 bg-gold" />
        <span className="font-wordmark text-sm font-bold uppercase tracking-[0.32em] text-gold-deep sm:text-base">Fortuna</span>
        <span className="h-px flex-1 bg-gold" />
      </div>
      <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-foreground sm:text-xs">Tu momento. Tu suerte. Tu fortuna.</p>
    </div>
  );
}
