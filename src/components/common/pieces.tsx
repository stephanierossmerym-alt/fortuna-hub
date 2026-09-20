import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function OriginTag({ origin }: { origin: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-surface px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold-deep">
      {origin}
    </span>
  );
}

export function MoneyTrace({ active }: { active: "Reservado" | "Vendido" | "Cobrado" | "Pagado" }) {
  const steps = ["Reservado", "Vendido", "Cobrado", "Pagado"] as const;
  const activeIndex = steps.indexOf(active);
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, index) => (
        <span
          key={step}
          className={cn(
            "rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em]",
            index <= activeIndex
              ? "border-gold/60 bg-gold-light/40 text-gold-deep"
              : "border-border bg-surface text-muted-foreground",
          )}
        >
          {step}
        </span>
      ))}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, hint }: { icon?: LucideIcon; label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="rounded-info border border-gold/35 bg-card p-5 shadow-warm">
      <div className="flex items-center gap-2 text-gold-deep">
        {Icon && <Icon className="h-5 w-5" strokeWidth={1.6} />}
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em]">{label}</p>
      </div>
      <p className="mt-2 font-display text-3xl font-bold tabular-nums text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon?: LucideIcon; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-gold/50 bg-card/70 px-6 py-12 text-center">
      {Icon && <Icon className="mx-auto h-10 w-10 text-gold" strokeWidth={1.3} />}
      <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function ConfirmCheck({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-info border border-status-success/40 bg-status-success-soft p-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-status-success text-background">
        <Check className="h-4 w-4" />
      </span>
      <div>
        <p className="font-semibold text-status-success">{title}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

export function WarningNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-info border border-status-pending/45 bg-status-pending-soft p-4 text-sm font-medium text-status-pending">
      <span aria-hidden>⚠️</span>
      <span>{children}</span>
    </p>
  );
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {["Disponible en App Store", "Disponible en Google Play"].map((label) => (
        <span
          key={label}
          className="rounded-button border border-gold/55 bg-card px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-deep"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function SiteFoot() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold-deep">
        <Globe className="h-4 w-4" strokeWidth={1.6} /> rossfortuna.com
      </p>
      <StoreBadges />
    </div>
  );
}
