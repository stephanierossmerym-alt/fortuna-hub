import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prizes as seedP, refundCauses, refunds as seedR, withdrawals as seedW, type Prize, type Refund, type RefundCause, type Withdrawal } from "@/data/prizes";

export const Route = createFileRoute("/panel/admin/premios")({
  head: () => ({
    meta: [
      { title: "Premios, retiros y reembolsos — Ross Fortuna" },
      { name: "description", content: "Validación de premios con código secreto, flujo de retiros y reembolsos por causa justificada." },
      { property: "og:title", content: "Premios y retiros — Ross Fortuna" },
      { property: "og:description", content: "El movimiento original nunca desaparece." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPrizes,
});

const admin = "Administrador RF-01";
const next: Partial<Record<Withdrawal["status"], Withdrawal["status"]>> = { "Solicitado": "En revisión", "En revisión": "Aprobado", "Aprobado": "Pagado" };

function AdminPrizes() {
  const [prizes, setPrizes] = useState<Prize[]>(seedP);
  const [ws, setWs] = useState<Withdrawal[]>(seedW);
  const [refunds, setRefunds] = useState<Refund[]>(seedR);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [cause, setCause] = useState<RefundCause>(refundCauses[0]);

  const move = (w: Withdrawal, status: Withdrawal["status"]) =>
    setWs((c) => c.map((x) => (x.id === w.id ? { ...x, status, note: status === "Rechazado" ? notes[w.id] : x.note, history: [...x.history, { at: "Hoy · 20:50", status, by: admin }] } : x)));

  return (
    <PanelShell role="Administración" subtitle="Premios y retiros" items={adminNav}>
      <SectionTitle eyebrow="Pagos a clientes" className="text-left">Premios, retiros y reembolsos</SectionTitle>
      <Tabs defaultValue="premios">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="premios" className="min-h-11">Premios</TabsTrigger>
          <TabsTrigger value="retiros" className="min-h-11">Retiros</TabsTrigger>
          <TabsTrigger value="reembolsos" className="min-h-11">Reembolsos</TabsTrigger>
        </TabsList>

        <TabsContent value="premios" className="mt-5 grid gap-4 xl:grid-cols-2">
          {prizes.map((p) => (
            <article key={p.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{p.id} · {p.customer}{p.guest && " (invitado)"}</p>
                  <p className="text-xs text-muted-foreground">{p.ticketId} · {p.drawName} · {p.suerte} · N° {p.number}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-display text-2xl font-semibold tabular-nums">${p.amount.toFixed(2)}</span>
                <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-xs">Código secreto: {p.secretCode}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Generado {p.generatedAt} · Caduca {p.expiresAt}</p>
              {p.status === "Retiro solicitado" && (
                <Button variant="fortune" size="sm" className="mt-3" onClick={() => setPrizes((c) => c.map((x) => (x.id === p.id ? { ...x, status: "Pagado" } : x)))}>Marcar como pagado</Button>
              )}
            </article>
          ))}
          <p className="text-xs text-muted-foreground xl:col-span-2">Solo el Administrador ve el código secreto completo; el cliente lo ve enmascarado (••••).</p>
        </TabsContent>

        <TabsContent value="retiros" className="mt-5 grid gap-4 xl:grid-cols-2">
          {ws.map((w) => {
            const n = next[w.status];
            const active = !!n;
            return (
              <article key={w.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{w.id} · {w.customer} · <span className="tabular-nums">${w.amount.toFixed(2)}</span></p>
                    <p className="text-xs text-muted-foreground">{w.destination}</p>
                  </div>
                  <StatusBadge status={w.status} />
                </div>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {w.history.map((h, i) => <li key={i}>{h.at} · <b className="text-foreground">{h.status}</b> · {h.by}</li>)}
                </ul>
                {w.note && <p className="mt-2 text-xs text-status-danger">Motivo: {w.note}</p>}
                {active && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold">Importe reservado mientras la solicitud esté activa.</p>
                    <Textarea placeholder="Motivo de rechazo" value={notes[w.id] ?? ""} onChange={(e) => setNotes((s) => ({ ...s, [w.id]: e.target.value }))} />
                    <div className="flex gap-3">
                      <Button variant="destructive" className="flex-1" disabled={!notes[w.id]?.trim()} onClick={() => move(w, "Rechazado")}>Rechazar</Button>
                      <Button variant="fortune" className="flex-1" onClick={() => move(w, n)}>Pasar a {n}</Button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </TabsContent>

        <TabsContent value="reembolsos" className="mt-5 space-y-4">
          <div className="rounded-info border border-gold/35 bg-surface p-4">
            <p className="text-sm font-semibold">Los reembolsos solo proceden por causa justificada. El movimiento original nunca desaparece.</p>
            <p className="mt-1 text-xs text-muted-foreground">No se reembolsa por arrepentimiento, número incorrecto, plan equivocado o cambio de opinión.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {refundCauses.map((c) => (
                <button key={c} type="button" onClick={() => setCause(c)} className={`min-h-11 rounded-full border px-3 text-xs font-semibold ${cause === c ? "border-gold bg-gold-light/40 text-gold-deep" : "border-gold/30 text-muted-foreground"}`}>{c}</button>
              ))}
            </div>
            <Button variant="velvet" size="sm" className="mt-3" onClick={() => setRefunds((r) => [{ id: `RE-${130 + r.length}`, reference: "RF-4602", customer: "Invitado RF-121", amount: 3, cause, originalMovement: "Pago recibido Hoy · 19:45", status: "Pendiente", createdAt: "Hoy · 20:52", by: null }, ...r])}>Registrar reembolso ({cause})</Button>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {refunds.map((r) => (
              <article key={r.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold-deep">{r.cause === "Pago fuera de horario" ? "Reembolso por pago fuera de horario" : r.cause}</p>
                    <p className="font-semibold">{r.id} · {r.reference} · {r.customer}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Movimiento original (se conserva): {r.originalMovement}</p>
                <p className="text-xs text-muted-foreground">Registrado {r.createdAt}{r.by ? ` · ${r.by}` : ""} · <span className="tabular-nums">${r.amount.toFixed(2)}</span></p>
                {r.status === "Pendiente" && (
                  <Button variant="fortune" size="sm" className="mt-3" onClick={() => setRefunds((c) => c.map((x) => (x.id === r.id ? { ...x, status: "Reembolsado", by: admin } : x)))}>Ejecutar reembolso</Button>
                )}
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PanelShell>
  );
}
