import { cn } from "@/lib/utils";
import logoAsset from "@/assets/ross-fortuna-logo.jpg.asset.json";
import symbolAsset from "@/assets/ross-fortuna-symbol.jpg.asset.json";
import wordmarkAsset from "@/assets/ross-fortuna-wordmark.jpg.asset.json";

type BrandProps = {
  variant?: "full" | "monogram" | "wordmark";
  className?: string;
};

export function Brand({ variant = "full", className }: BrandProps) {
  const source = variant === "monogram" ? symbolAsset.url : variant === "wordmark" ? wordmarkAsset.url : logoAsset.url;
  const sizing = variant === "monogram" ? "h-14 w-14 object-contain" : variant === "wordmark" ? "h-12 w-auto max-w-56 object-contain" : "h-auto w-full max-w-80 object-contain";

  return <img src={source} alt={variant === "full" ? "Ross Fortuna" : ""} aria-hidden={variant !== "full"} className={cn("brand-image block mix-blend-multiply", sizing, className)} />;
}
