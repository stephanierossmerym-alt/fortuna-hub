import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { InfoBox } from "@/components/brand/info-box";
import { OriginTag, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { receipts as seedReceipts, type Receipt } from "@/data/panel";

export const Route = createFileRoute("/panel/admin/comprobantes")({
  head: () => ({
    meta: [
      { title: "Comprobantes por verificar — Ross Fortuna" },
      { name: "description", content: "Revisión de comprobantes de pago con hora verificada, revisor y resultado de la revisión." },
      { property: "og:title", content: "Comprobantes — Ross Fortuna" },
      { property: "og:description", content: "Hora de pago ≠ hora de aprobación administrativa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminReceipts,
});

const reviewer = "Administrador RF-01";

function AdminReceipts() {
  const [items, setItems] = useState<Receipt[]>(seedReceipts);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const decide = (id: string, result: "Aprobado" | "Rechazado") => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: result,
              reviewer,
              reviewedAt: "Hoy · 20:41:07",
              result:
                result === "Aprobado"
                  ? item.drawClosed
                    ? "Aprobado fuera de horario · genera reembolso"
                    : "Aprobado"
                  : `Rechazado · ${reasons[id] ?? "sin motivo registrado"}`,
            }
          : item,
      ),
    );
  };

  return (
    <PanelShell role="Administración" subtitle="Verificación de pagos" items={adminNav}>
      <SectionTitle eyebrow="Pagos" className="text-left">Comprobantes</SectionTitle>
      <p className="text-sm text-muted-foreground">Hora de pago ≠ hora de aprobación administrativa.</p>

      <div className="grid gap-5 xl:grid-cols-2">
        {items.map((item) => {
          const decided = item.status === "Aprobado" || item.status === "Rechazado";
          return (
            <article key={item.id} className="space-y-4 rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-display text-xl font-semibold">{item.id}</p>
                  <p className="text-sm text-muted-foreground">Ticket {item.ticketId} · {item.customer}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="grid divide-y divide-border/70 rounded-info border border-gold/30 bg-surface sm:grid-cols-2 sm:divide-y-0 sm:[&>*+*]:border-l sm:[&>*+*]:border-border/70">
                <InfoBox label="Creación del comprobante" value={item.createdAt} />
                <InfoBox label="Carga del comprobante" value={item.uploadedAt} />
                <InfoBox label="Hora verificada del pago" value={item.verifiedTime} />
                <InfoBox label="Monto" value={`$${item.amount.toFixed(2)} · ${item.method}`} />
                <InfoBox label="Revisión" value={item.reviewedAt ?? "Sin revisar"} />
                <InfoBox label="Revisor" value={item.reviewer ?? "—"} />
              </div>

              <InfoBox label="Resultado de la revisión" value={item.result ?? "Pendiente de decisión"} className="rounded-info border border-gold/30 bg-surface" />
              <OriginTag origin={item.origin} />

              {item.drawClosed && <WarningNote>PENDIENTE DE VERIFICACIÓN — SORTEO CERRADO. Si el pago se recibió fuera de horario corresponde un REEMBOLSO POR PAGO FUERA DE HORARIO.</WarningNote>}
              {item.afterResults && <WarningNote>ANULACIÓN O APROBACIÓN POSTERIOR A LA PUBLICACIÓN DE RESULTADOS.</WarningNote>}
              {item.note && <p className="text-sm text-muted-foreground">{item.note}</p>}

              {decided ? (
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Decisión registrada en auditoría</p>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Motivo o nota de la revisión"
                    value={reasons[item.id] ?? ""}
                    onChange={(event) => setReasons((current) => ({ ...current, [item.id]: event.target.value }))}
                  />
                  <div className="flex flex-wrap gap-3">
                    <Button variant="fortune" onClick={() => decide(item.id, "Aprobado")}>Aprobar</Button>
                    <Button variant="destructive" onClick={() => decide(item.id, "Rechazado")}>Rechazar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Solo un Administrador autorizado puede verificar esta participación.</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </PanelShell>
  );
}
