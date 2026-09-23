import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { GoldBar } from "@/components/brand/info-box";
import { WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { draws, modalities, nightLotteryByDay, plans } from "@/data/draws";

export const Route = createFileRoute("/panel/admin/sorteos")({
  head: () => ({
    meta: [
      { title: "Sorteos, suertes y planes — Ross Fortuna" },
      { name: "description", content: "Configuración de sorteos diarios, modalidades y planes de premios por suerte con su versión vigente." },
      { property: "og:title", content: "Sorteos y planes — Ross Fortuna" },
      { property: "og:description", content: "Cada plan indica cuánto paga por cada $1 jugado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDraws,
});

function AdminDraws() {
  const [open, setOpen] = useState<Record<string, boolean>>(Object.fromEntries(draws.map((draw) => [draw.id, draw.open])));

  return (
    <PanelShell role="Administración" subtitle="Configuración de juego" items={adminNav}>
      <SectionTitle eyebrow="Configuración" className="text-left">Sorteos y planes</SectionTitle>

      <section className="grid gap-4 lg:grid-cols-2">
        {draws.map((draw) => (
          <article key={draw.id} className="overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm">
            <GoldBar left={<>{draw.name} · {draw.time}</>} right={<>Lotería {draw.lottery}</>} />
            <div className="space-y-2 p-5 text-sm">
              <p className="text-muted-foreground">Cierre de ventas: <strong className="text-foreground tabular-nums">{draw.closesAt}</strong></p>
              <p className="text-muted-foreground">Días: <strong className="text-foreground">{draw.days}</strong></p>
              <p className="text-muted-foreground">{draw.note}</p>
              <label className="mt-3 flex min-h-12 items-center justify-between gap-3 rounded-info border border-gold/30 bg-surface px-4">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">Sorteo abierto</span>
                <Switch
                  checked={open[draw.id] ?? false}
                  onCheckedChange={(value) => setOpen((current) => ({ ...current, [draw.id]: value }))}
                />
              </label>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl font-semibold">Lotería de referencia por día (Noche)</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {nightLotteryByDay.map((row) => (
            <div key={row.day} className="rounded-info border border-gold/30 bg-card px-4 py-3 text-sm shadow-warm">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">{row.day}</p>
              <p className="mt-1 font-semibold">{row.lottery}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl font-semibold">Modalidades</h3>
        <div className="flex flex-wrap gap-2">
          {modalities.map((modality) => (
            <span key={modality.id} className="rounded-full border border-gold/50 bg-surface px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">
              {modality.label} · {modality.active ? "Activa" : "Inactiva"}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-2xl font-semibold">Planes de premios por suerte</h3>
        <p className="text-sm text-muted-foreground">La tabla indica cuánto paga el plan por cada $1 jugado. Cada cambio crea una nueva versión y queda en auditoría.</p>
        <div className="grid gap-5 xl:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm">
              <GoldBar left={<>{plan.name} · {plan.version}</>} right={<>{modalities.find((m) => m.id === plan.modalityId)?.label}</>} />
              <div className="divide-y divide-border/70 px-5 py-2">
                {plan.prizes.map((prize) => (
                  <div key={prize.position} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-2 text-sm">
                    <strong className="text-center tabular-nums text-gold-deep">{prize.position}</strong>
                    <span className="text-muted-foreground">{prize.name}</span>
                    <span className="font-extrabold tabular-nums">${prize.perDollar.toFixed(2)} por cada $1</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Button variant="velvet" className="w-full">Crear nueva versión</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <WarningNote>Un plan publicado nunca se sobrescribe: se crea una versión nueva y los tickets emitidos conservan su versión original.</WarningNote>
    </PanelShell>
  );
}
