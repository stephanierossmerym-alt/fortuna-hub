import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Search } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { EmptyState, OriginTag, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketDigital } from "@/components/ticket/ticket-digital";
import { ticketVariants, type Ticket } from "@/data/tickets";

export const Route = createFileRoute("/panel/admin/tickets")({
  head: () => ({
    meta: [
      { title: "Búsqueda de tickets — Ross Fortuna" },
      { name: "description", content: "Búsqueda por código, número o cliente con el estado y la línea de tiempo de cada ticket." },
      { property: "og:title", content: "Tickets — Ross Fortuna" },
      { property: "og:description", content: "Estado, origen y trazabilidad de cada ticket emitido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminTickets,
});

function AdminTickets() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);

  const term = query.trim().toLowerCase();
  const found = term
    ? ticketVariants.filter((ticket) =>
        [ticket.id, ticket.code, ticket.number, ticket.customer, ticket.status].some((value) =>
          value.toLowerCase().includes(term),
        ),
      )
    : ticketVariants;

  return (
    <PanelShell role="Administración" subtitle="Tickets emitidos" items={adminNav}>
      <SectionTitle eyebrow="Consulta" className="text-left">Tickets</SectionTitle>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-deep" />
          <Input
            className="pl-10"
            placeholder="Código, número, cliente o estado"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            inputMode="search"
          />
        </div>
        <Button variant="velvet"><QrCode /> Escanear QR</Button>
      </div>

      {found.length === 0 ? (
        <EmptyState icon={Search} title="Sin coincidencias" description="No se encontró ningún ticket con ese criterio de búsqueda." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {found.map((ticket) => (
            <article key={ticket.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xl font-semibold">{ticket.id}</p>
                <StatusBadge status={ticket.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{ticket.drawName} {ticket.drawTime} · {ticket.customer}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Número</dt><dd className="text-xl font-extrabold tabular-nums">{ticket.number}</dd></div>
                <div><dt className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Código</dt><dd className="tabular-nums">{ticket.code}</dd></div>
                <div><dt className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Valor</dt><dd className="tabular-nums">${ticket.value.toFixed(2)}</dd></div>
                <div><dt className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Plan</dt><dd>{ticket.plan} {ticket.planVersion}</dd></div>
              </dl>
              <div className="mt-3"><OriginTag origin={ticket.origin} /></div>
              <ol className="mt-4 space-y-1 border-l border-gold/40 pl-4 text-xs text-muted-foreground">
                <li>Creado · {ticket.purchaseDate}</li>
                <li>Comprobante cargado · hora verificada registrada</li>
                <li>Revisión administrativa · {ticket.status}</li>
              </ol>
              <Button variant="velvet" className="mt-4 w-full" onClick={() => setSelected(selected?.id === ticket.id ? null : ticket)}>
                {selected?.id === ticket.id ? "Ocultar ticket" : "Ver ticket digital"}
              </Button>
              {selected?.id === ticket.id && (
                <div className="mt-4">
                  <TicketDigital ticket={ticket} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <WarningNote>Una anulación nunca elimina el ticket: queda marcado como ANULADO con su motivo y su responsable.</WarningNote>
    </PanelShell>
  );
}
