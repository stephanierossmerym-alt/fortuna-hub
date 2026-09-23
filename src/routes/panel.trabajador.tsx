import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ban, Clock, DollarSign, Plus, Receipt, Ticket as TicketIcon } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { workerNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { MoneyTrace, OriginTag, StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { workerSales, workerShift, type WorkerSale } from "@/data/panel";

export const Route = createFileRoute("/panel/trabajador")({
  head: () => ({
    meta: [
      { title: "Panel de Trabajador — Ross Fortuna" },
      { name: "description", content: "Ventas del turno, anulaciones en horario permitido y trazabilidad del dinero recibido en Ross Fortuna." },
      { property: "og:title", content: "Panel de Trabajador — Ross Fortuna" },
      { property: "og:description", content: "Ventas del turno y anulaciones con trazabilidad visible." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkerPanel,
});

function WorkerPanel() {
  const [sales, setSales] = useState<WorkerSale[]>(workerSales);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const cancel = (id: string) => {
    setSales((current) => current.map((sale) => (sale.id === id ? { ...sale, status: "Anulado", cancelMinutesLeft: 0 } : sale)));
    setCancelling(null);
    setReason("");
  };

  return (
    <PanelShell role="Trabajador" subtitle={`${workerShift.worker} · ${workerShift.shift}`} items={workerNav}>
      <SectionTitle eyebrow="Turno en curso" className="text-left">Resumen del turno</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={TicketIcon} label="Tickets vendidos" value={workerShift.sold} hint="Vendido ≠ Cobrado" />
        <StatCard icon={DollarSign} label="Dinero cobrado" value={`$${workerShift.collected.toFixed(2)}`} hint="Cobrado ≠ Pagado" />
        <StatCard icon={Receipt} label="Pendiente de verificación" value={`$${workerShift.pending.toFixed(2)}`} hint="Reservado ≠ Vendido" />
      </div>

      <div className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
        <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-deep">Trazabilidad del turno</p>
        <MoneyTrace active="Cobrado" />
      </div>

      <Button variant="fortune" asChild className="w-full sm:w-auto">
        <Link to="/jugar"><Plus /> Registrar nueva venta</Link>
      </Button>

      <section className="space-y-4">
        <h3 className="font-display text-2xl font-semibold">Mis ventas</h3>
        <p className="text-sm text-muted-foreground">
          Un trabajador solo puede anular sus propias ventas dentro del horario permitido. La anulación nunca elimina el registro.
        </p>

        <div className="grid gap-4 lg:hidden">
          {sales.map((sale) => (
            <SaleCard
              key={sale.id}
              sale={sale}
              cancelling={cancelling === sale.id}
              reason={reason}
              onReason={setReason}
              onStart={() => setCancelling(sale.id)}
              onCancel={() => cancel(sale.id)}
              onDismiss={() => setCancelling(null)}
            />
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-card border border-gold/35 bg-card shadow-warm lg:block">
          <table className="w-full text-sm">
            <thead className="bg-surface text-[0.6rem] uppercase tracking-[0.16em] text-gold-deep">
              <tr>
                {["Venta", "Ticket", "Sorteo", "N°", "Valor", "Hora", "Origen", "Estado", "Acción"].map((head) => (
                  <th key={head} className="px-3 py-3 text-left font-bold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-3 py-3 font-semibold tabular-nums">{sale.id}</td>
                  <td className="px-3 py-3 tabular-nums">{sale.ticketId}</td>
                  <td className="px-3 py-3">{sale.drawName}</td>
                  <td className="px-3 py-3 text-lg font-extrabold tabular-nums">{sale.number}</td>
                  <td className="px-3 py-3 tabular-nums">${sale.value.toFixed(2)}</td>
                  <td className="px-3 py-3 tabular-nums">{sale.soldAt}</td>
                  <td className="px-3 py-3"><OriginTag origin={sale.origin} /></td>
                  <td className="px-3 py-3"><StatusBadge status={sale.status} /></td>
                  <td className="px-3 py-3">
                    {sale.status === "Anulado" ? (
                      <span className="text-xs text-muted-foreground">Anulado, registro conservado</span>
                    ) : sale.cancelMinutesLeft > 0 ? (
                      <Button size="sm" variant="velvet" onClick={() => setCancelling(sale.id)}>
                        <Ban /> Anular · {sale.cancelMinutesLeft} min
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Fuera de horario permitido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cancelling && (
          <div className="hidden rounded-card border border-status-danger/40 bg-status-danger-soft p-5 lg:block">
            <p className="font-semibold text-status-danger">Anular la venta {cancelling}</p>
            <p className="mt-1 text-sm text-muted-foreground">El movimiento original nunca desaparece: la venta queda marcada como ANULADO.</p>
            <Textarea
              className="mt-3"
              placeholder="Motivo de la anulación"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <Button variant="destructive" disabled={reason.trim().length < 5} onClick={() => cancel(cancelling)}>
                Confirmar anulación
              </Button>
              <Button variant="ghost" onClick={() => setCancelling(null)}>Volver</Button>
            </div>
          </div>
        )}
      </section>

      <WarningNote>Una anulación posterior al resultado solo puede realizarla un Administrador autorizado.</WarningNote>
    </PanelShell>
  );
}

function SaleCard({
  sale,
  cancelling,
  reason,
  onReason,
  onStart,
  onCancel,
  onDismiss,
}: {
  sale: WorkerSale;
  cancelling: boolean;
  reason: string;
  onReason: (value: string) => void;
  onStart: () => void;
  onCancel: () => void;
  onDismiss: () => void;
}) {
  return (
    <article className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-xl font-semibold">{sale.ticketId}</p>
        <StatusBadge status={sale.status} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{sale.drawName} · {sale.customer}</p>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div><p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Número</p><p className="text-xl font-extrabold tabular-nums">{sale.number}</p></div>
        <div><p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Valor</p><p className="text-xl font-extrabold tabular-nums">${sale.value.toFixed(2)}</p></div>
        <div><p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold-deep">Hora</p><p className="text-xl font-extrabold tabular-nums">{sale.soldAt}</p></div>
      </div>
      <div className="mt-3"><OriginTag origin={sale.origin} /></div>

      {sale.status === "Anulado" ? (
        <p className="mt-4 text-xs text-muted-foreground">Anulado · el registro se conserva en el historial.</p>
      ) : sale.cancelMinutesLeft > 0 ? (
        cancelling ? (
          <div className="mt-4 space-y-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-status-danger">
              <Clock className="h-4 w-4" /> Quedan {sale.cancelMinutesLeft} minutos para anular
            </p>
            <Textarea placeholder="Motivo de la anulación" value={reason} onChange={(event) => onReason(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button variant="destructive" disabled={reason.trim().length < 5} onClick={onCancel}>Confirmar anulación</Button>
              <Button variant="ghost" onClick={onDismiss}>Volver</Button>
            </div>
          </div>
        ) : (
          <Button variant="velvet" className="mt-4 w-full" onClick={onStart}>
            <Ban /> Anular · quedan {sale.cancelMinutesLeft} min
          </Button>
        )
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">Fuera del horario permitido para anular.</p>
      )}
    </article>
  );
}
