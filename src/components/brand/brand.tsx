import { cn } from "@/lib/utils";

type BrandProps = {
  variant?: "full" | "monogram" | "wordmark";
  className?: string;
  priority?: boolean;
};

const BRAND_SOURCES = {
  full: "/brand/ross-fortuna-logo.webp",
  monogram: "/brand/ross-fortuna-symbol.webp",
  wordmark: "/brand/ross-fortuna-wordmark.webp",
} as const;

export function Brand({ variant = "full", className, priority = false }: BrandProps) {
  const sizing = variant === "monogram"
    ? "h-auto w-full max-w-12 object-contain"
    : variant === "wordmark"
      ? "h-auto w-full max-w-36 object-contain"
      : "h-auto w-full max-w-64 object-contain sm:max-w-72 lg:max-w-80";

  return (
    <img
      src={BRAND_SOURCES[variant]}
      alt={variant === "full" ? "Ross Fortuna" : ""}
      aria-hidden={variant !== "full"}
      width={variant === "monogram" ? 320 : variant === "wordmark" ? 420 : 640}
      height={variant === "monogram" ? 264 : variant === "wordmark" ? 112 : 629}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("brand-image block", sizing, className)}
    />
  );
}
