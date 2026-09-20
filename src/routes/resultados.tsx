import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { GoldBar } from "@/components/brand/info-box";
import { EmptyState } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { results } from "@/data/results";
import { draws } from "@/data/draws";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Resultados de las rifas diarias — Ross Fortuna" },
      { name: "description", content: "Consulta los números ganadores por suerte de los sorteos Matutina y Noche de Ross Fortuna." },
      { property: "og:title", content: "Resultados — Ross Fortuna" },
      { property: "og:description", content: "Números ganadores por suerte de los sorteos Matutina y Noche." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resultados,
});

function Resultados() {
  const [filter, setFilter] = useState<string>("todos");
  const visible = filter === "todos" ? results : results.filter((item) => item.drawName.toLowerCase() === filter);

  return (
    <AppShell className="space-y-8">
      <SectionTitle eyebrow="Rifas diarias">Resultados</SectionTitle>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant={filter === "todos" ? "fortune" : "velvet"} size="sm" onClick={() => setFilter("todos")}>Todos</Button>
        {draws.map((draw) => (
          <Button
            key={draw.id}
            size="sm"
            variant={filter === draw.name.toLowerCase() ? "fortune" : "velvet"}
            onClick={() => setFilter(draw.name.toLowerCase())}
          >
            {draw.name}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={Trophy} title="Sin resultados" description="Todavía no hay resultados publicados para este sorteo." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {visible.map((result) => (
            <article key={result.id} className="overflow-hidden rounded-card border border-gold/40 bg-card shadow-warm">
              <GoldBar left={<>{result.drawName} · {result.date}</>} right={<>{result.lottery} {result.time}</>} />
              <div className="divide-y divide-border/70 px-5 py-2">
                {result.winning.map((row) => (
                  <div key={row.position} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                    <strong className="text-center tabular-nums text-gold-deep">{row.position}</strong>
                    <span className="text-sm text-muted-foreground">{row.name}</span>
                    <span className="text-xl font-extrabold tabular-nums">{row.number}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
