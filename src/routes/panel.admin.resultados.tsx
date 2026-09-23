import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { GoldBar } from "@/components/brand/info-box";
import { ConfirmCheck, WarningNote } from "@/components/common/pieces";
import { StatusBadge } from "@/components/brand/status-badge";
import { Button } from "@/components/ui/button";
import { results } from "@/data/results";
import { ticketVariants } from "@/data/tickets";

export const Route = createFileRoute("/panel/admin/resultados")({
  head: () => ({
    meta: [
      { title: "Publicación de resultados — Ross Fortuna" },
      { name: "description", content: "Carga y publicación de números ganadores por suerte y validación de tickets premiados." },
      { property: "og:title", content: "Resultados — Administración Ross Fortuna" },
      { property: "og:description", content: "Publicación oficial y validación de premios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminResults,
});

function AdminResults() {
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(results.map((result) => [result.id, result.published])),
  );
  const winners = ticketVariants.filter((ticket) => ticket.status === "Ganador");

  return (
    <PanelShell role="Administración" subtitle="Resultados y premios" items={adminNav}>
      <SectionTitle eyebrow="Sorteos" className="text-left">Resultados</SectionTitle>

      <div className="grid gap-5 xl:grid-cols-2">
        {results.map((result) => (
          <article key={result.id} className="overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm">
            <GoldBar left={<>{result.drawName} · {result.date}</>} right={<>{result.lottery} {result.time}</>} />
            <div className="divide-y divide-border/70 px-5 py-2">
              {result.winning.map((row) => (
                <div key={row.position} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-2 text-sm">
                  <strong className="text-center tabular-nums text-gold-deep">{row.position}</strong>
                  <span className="text-muted-foreground">{row.name}</span>
                  <span className="text-lg font-extrabold tabular-nums">{row.number}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 px-5 pb-5">
              {published[result.id] ? (
                <ConfirmCheck title="Resultado publicado" description="La publicación quedó registrada en auditoría con fecha y responsable." />
              ) : (
                <Button variant="fortune" className="w-full" onClick={() => setPublished((current) => ({ ...current, [result.id]: true }))}>
                  Publicar resultado
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        <h3 className="font-display text-2xl font-semibold">Validación de premios</h3>
        {winners.map((ticket) => (
          <div key={ticket.id} className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div>
              <p className="font-display text-lg font-semibold">{ticket.id} · número {ticket.number}</p>
              <p className="text-sm text-muted-foreground">{ticket.customer} · código secreto ••••</p>
            </div>
            <StatusBadge status={ticket.status} />
            <Button variant="velvet">Validar premio</Button>
          </div>
        ))}
        <p className="text-sm text-muted-foreground">El código secreto permanece enmascarado salvo para un Administrador autorizado.</p>
      </section>

      <WarningNote>Toda aprobación posterior a la publicación de resultados se marca con advertencia y queda en auditoría.</WarningNote>
    </PanelShell>
  );
}
