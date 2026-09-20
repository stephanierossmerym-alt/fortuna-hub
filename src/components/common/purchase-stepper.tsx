import { cn } from "@/lib/utils";

export function PurchaseStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Progreso de la compra">
      {steps.map((step, index) => {
        const state = index < current ? "done" : index === current ? "current" : "todo";
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em]",
                state === "current" && "border-gold bg-gold-light/50 text-gold-deep",
                state === "done" && "border-status-success/40 bg-status-success-soft text-status-success",
                state === "todo" && "border-border bg-surface text-muted-foreground",
              )}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className="tabular-nums">{index + 1}</span>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
