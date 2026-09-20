import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function InfoBox({ icon: Icon, label, value, className }: { icon?: LucideIcon; label: string; value: React.ReactNode; className?: string }) {
  return <div className={cn("flex min-w-0 gap-3 p-4", className)}>{Icon && <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.7} />}<div className="min-w-0"><p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-deep">{label}</p><div className="mt-1 text-sm font-semibold leading-snug text-foreground">{value}</div></div></div>;
}

export function GoldBar({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return <div className="gold-metal grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-t-xl px-4 py-2 text-xs font-extrabold uppercase text-gold-ink sm:text-sm"><span className="min-w-0">{left}</span><span className="shrink-0">{right}</span></div>;
}