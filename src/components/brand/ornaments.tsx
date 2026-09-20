import type { ReactNode } from "react";
import { Gift, Ticket, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function GoldRibbon({ position = "top" }: { position?: "top" | "bottom" }) {
  return <div aria-hidden className={cn("gold-ribbon", position === "bottom" && "gold-ribbon-bottom")} />;
}

export function GoldDivider({ className }: { className?: string }) {
  return <div className={cn("flex items-center gap-3 text-gold-deep", className)} aria-hidden><span className="h-px flex-1 bg-gold/60" /><span className="text-lg">✦</span><span className="h-px flex-1 bg-gold/60" /></div>;
}

export function SectionTitle({ eyebrow, children, className }: { eyebrow?: string; children: ReactNode; className?: string }) {
  return <div className={cn("text-center", className)}>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-deep">{eyebrow}</p>}<h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{children}</h2></div>;
}

const pillars = [
  [Ticket, "Sorteos diarios"], [Gift, "Rifas especiales"], [Trophy, "Premios reales"], [Users, "Una comunidad ganadora"],
] as const;

export function PillarsRow() {
  return <div className="grid grid-cols-2 border-y border-gold/40 py-5 sm:grid-cols-4">{pillars.map(([Icon, label], index) => <div key={label} className={cn("flex min-h-24 flex-col items-center justify-center gap-2 px-3 text-center", index % 2 === 1 && "border-l border-gold/35", index > 1 && "border-t border-gold/35 sm:border-t-0", index === 2 && "sm:border-l")}><Icon className="h-7 w-7 text-gold-deep" strokeWidth={1.5} /><span className="text-[0.65rem] font-bold uppercase tracking-[0.18em]">{label}</span></div>)}</div>;
}
