import { Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { SpecialRaffle } from "@/data/special-raffles";
import { cn } from "@/lib/utils";

const tones: Record<SpecialRaffle["tone"], string> = {
  gold: "from-gold-light via-gold to-gold-deep",
  cream: "from-accent via-gold-light to-gold",
  sand: "from-surface via-gold-light to-gold-deep",
};

export function RaffleCard({ raffle }: { raffle: SpecialRaffle }) {
  const percent = Math.round((raffle.sold / raffle.total) * 100);
  const complete = raffle.sold >= raffle.total;
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm">
      <div className={cn("relative flex h-36 items-center justify-center bg-gradient-to-br", tones[raffle.tone])} aria-hidden>
        <Gift className="h-14 w-14 text-gold-ink/70" strokeWidth={1.2} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl font-semibold text-foreground">{raffle.name}</h3>
        <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-deep">{raffle.prize}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{raffle.description}</p>
        <ul className="mt-4 space-y-1.5">
          {raffle.packages.map((pack) => (
            <li key={pack.id} className="flex items-center justify-between rounded-button border border-gold/35 bg-surface px-3 py-2 text-sm">
              <span>{pack.label}</span>
              <span className="font-semibold tabular-nums">${pack.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold tabular-nums text-muted-foreground">
            <span>{raffle.sold.toLocaleString("es-EC")} / {raffle.total.toLocaleString("es-EC")} vendidos</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} className="mt-2" />
          <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
            {complete ? "Rifa completamente vendida — lista para sorteo" : raffle.closing}
          </p>
        </div>
      </div>
    </article>
  );
}
