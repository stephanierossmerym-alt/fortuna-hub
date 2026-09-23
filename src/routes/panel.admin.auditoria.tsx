import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { EmptyState, WarningNote } from "@/components/common/pieces";
import { Input } from "@/components/ui/input";
import { auditTrail } from "@/data/panel";

export const Route = createFileRoute("/panel/admin/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoría de la operación — Ross Fortuna" },
      { name: "description", content: "Quién, qué, cuándo, valor anterior, valor nuevo y motivo de cada cambio registrado." },
      { property: "og:title", content: "Auditoría — Ross Fortuna" },
      { property: "og:description", content: "Historial completo de cambios con responsable y motivo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminAudit,
});

function AdminAudit() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const rows = term
    ? auditTrail.filter((entry) => [entry.who, entry.what, entry.when, entry.reason].some((value) => value.toLowerCase().includes(term)))
    : auditTrail;

  return (
    <PanelShell role="Administración" subtitle="Historial de cambios" items={adminNav}>
      <SectionTitle eyebrow="Trazabilidad" className="text-left">Auditoría</SectionTitle>
      <p className="text-sm text-muted-foreground">Quién → qué → cuándo → valor anterior → valor nuevo → motivo. Ningún registro se elimina.</p>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-deep" />
        <Input className="pl-10" placeholder="Buscar por responsable, elemento o motivo" value={query} onChange={(event) => setQuery(event.target.value)} inputMode="search" />
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={Search} title="Sin coincidencias" description="Ningún movimiento de auditoría coincide con la búsqueda." />
      ) : (
        <>
          <div className="grid gap-4 xl:hidden">
            {rows.map((entry) => (
              <article key={entry.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
                <p className="font-display text-lg font-semibold">{entry.what}</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.who} · {entry.role}</p>
                <p className="mt-1 text-xs tabular-nums text-muted-foreground">{entry.when}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Antes</p><p>{entry.before}</p></div>
                  <div><p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Después</p><p>{entry.after}</p></div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{entry.reason}</p>
                {entry.afterResults && <p className="mt-3 text-sm font-semibold text-status-pending">⚠️ Cambio posterior a la publicación de resultados</p>}
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm xl:block">
            <table className="w-full text-sm">
              <thead className="bg-surface text-[0.6rem] uppercase tracking-[0.16em] text-gold-deep">
                <tr>{["Quién", "Qué", "Cuándo", "Antes", "Después", "Motivo"].map((head) => <th key={head} className="px-3 py-3 text-left font-bold">{head}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {rows.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-3 py-3 font-semibold">{entry.who}</td>
                    <td className="px-3 py-3">{entry.what}{entry.afterResults && <span className="ml-2 text-status-pending">⚠️</span>}</td>
                    <td className="px-3 py-3 tabular-nums">{entry.when}</td>
                    <td className="px-3 py-3 text-muted-foreground">{entry.before}</td>
                    <td className="px-3 py-3">{entry.after}</td>
                    <td className="px-3 py-3 text-muted-foreground">{entry.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <WarningNote>El valor anterior nunca se sobrescribe: cada corrección genera un nuevo registro.</WarningNote>
    </PanelShell>
  );
}
