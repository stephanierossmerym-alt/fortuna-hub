import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { Ledger } from "@/components/common/ledger";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { movements as seedMovements, topUps as seed, type Movement, type TopUp } from "@/data/wallet";

export const Route = createFileRoute("/panel/admin/recargas")({
  head: () => ({
    meta: [
      { title: "Recargas de saldo — Ross Fortuna" },
      { name: "description", content: "Revisión de recargas: aprobar suma al saldo con movimiento registrado; rechazar exige motivo." },
      { property: "og:title", content: "Recargas — Ross Fortuna" },
      { property: "og:description", content: "Subir el comprobante no aumenta el saldo hasta su aprobación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminTopUps,
});

const reviewer = "Administrador RF-01";

function AdminTopUps() {
  const [items, setItems] = useState<TopUp[]>(seed);
  const [ledger, setLedger] = useState<Movement[]>(seedMovements);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const decide = (t: TopUp, status: "Aprobado" | "Rechazado") => {
    setItems((cur) => cur.map((i) => (i.id === t.id ? { ...i, status, reviewer, reviewedAt: "Hoy · 20:45:12", verifiedPaymentTime: status === "Aprobado" ? "Hoy · 18:24:03" : null, note: status === "Rechazado" ? reasons[t.id] : undefined } : i)));
    if (status === "Aprobado") {
      setLedger((cur) => {
        const before = cur.at(-1)?.after ?? 0;
        return [...cur, { id: `MV-${9100 + cur.length}`, date: "Hoy · 20:45", kind: "Dinero recibido", concept: `Recarga aprobada · ${t.customer}`, reference: t.id, amount: t.amount, before, after: before + t.amount, by: reviewer }];
      });
    }
  };

  return (
    <PanelShell role="Administración" subtitle="Recargas de saldo" items={adminNav}>
      <SectionTitle eyebrow="Billetera" className="text-left">Recargas</SectionTitle>
      <p className="text-sm font-semibold">Subir el comprobante no aumenta el saldo hasta su aprobación.</p>

      <div className="grid gap-4 xl:grid-cols-2">
        {items.map((t) => {
          const open = t.status === "Pendiente" || t.status === "En revisión";
          return (
            <article key={t.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{t.id} · {t.customer}</p>
                  <p className="text-xs text-muted-foreground">{t.method} · <span className="tabular-nums">${t.amount.toFixed(2)}</span></p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-1 text-xs">
                <dt className="text-muted-foreground">Creada</dt><dd className="text-right">{t.createdAt}</dd>
                <dt className="text-muted-foreground">Comprobante</dt><dd className="text-right">{t.uploadedAt ?? "Sin cargar"}</dd>
                <dt className="text-muted-foreground">Hora verificada</dt><dd className="text-right">{t.verifiedPaymentTime ?? "—"}</dd>
                <dt className="text-muted-foreground">Revisor</dt><dd className="text-right">{t.reviewer ?? "—"}{t.reviewedAt ? ` · ${t.reviewedAt}` : ""}</dd>
              </dl>
              {t.note && <p className="mt-2 text-xs text-status-danger">Motivo: {t.note}</p>}
              {open && (
                <div className="mt-4 space-y-3">
                  <Textarea placeholder="Motivo de rechazo (obligatorio para rechazar)" value={reasons[t.id] ?? ""} onChange={(e) => setReasons((r) => ({ ...r, [t.id]: e.target.value }))} />
                  <div className="flex gap-3">
                    <Button variant="danger" className="flex-1" disabled={!reasons[t.id]?.trim()} onClick={() => decide(t, "Rechazado")}>Rechazar</Button>
                    <Button variant="fortune" className="flex-1" disabled={!t.uploadedAt} onClick={() => decide(t, "Aprobado")}>Aprobar</Button>
                  </div>
                  {!t.uploadedAt && <p className="text-xs text-muted-foreground">No se puede aprobar sin comprobante cargado.</p>}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold">Libro de movimientos</h2>
        <Ledger items={[...ledger].reverse()} />
      </section>
    </PanelShell>
  );
}
