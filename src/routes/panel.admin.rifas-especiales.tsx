import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, EyeOff, Gift, ReceiptText, TicketCheck } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { initialSpecialPurchases, specialRaffles, type SpecialPurchase } from "@/data/special-raffles";

export const Route = createFileRoute("/panel/admin/rifas-especiales")({
  head: () => ({ meta: [
    { title: "Administrar Rifas Especiales — Ross Fortuna" },
    { name: "description", content: "Control simulado de ventas, comprobantes y asignación aleatoria en Rifas Especiales." },
    { property: "og:title", content: "Administrar Rifas Especiales — Ross Fortuna" },
    { property: "og:description", content: "Ventas, cierres y participaciones de las rifas especiales." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AdminSpecialRaffles,
});

function AdminSpecialRaffles() {
  const [purchases, setPurchases] = useState<SpecialPurchase[]>(initialSpecialPurchases);
  const [soldOut, setSoldOut] = useState(false);
  const raffles = specialRaffles.map((raffle) => raffle.id === "efectivo" && soldOut ? { ...raffle, sold: raffle.total } : raffle);
  const pending = purchases.filter((purchase) => purchase.status === "Pago pendiente" || purchase.status === "En revisión").length;

  const review = (id: string) => setPurchases((current) => current.map((purchase) => purchase.id === id ? { ...purchase, status: "En revisión" } : purchase));
  const approve = (id: string) => setPurchases((current) => current.map((purchase) => purchase.id === id ? { ...purchase, status: "Aprobado", verifiedAt: "Ahora", reviewer: "Administrador RF-01", numbers: generateNumbers(purchase.chances) } : purchase));

  return (
    <PanelShell role="Administración" subtitle="Ventas y asignación aleatoria" items={adminNav}>
      <SectionTitle eyebrow="Control especial" className="text-left">Rifas Especiales</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Gift} label="Rifas activas" value={raffles.filter((raffle) => raffle.sold < raffle.total).length} hint="Disponibilidad pública" />
        <StatCard icon={ReceiptText} label="Por revisar" value={pending} hint="PAGO PENDIENTE ≠ Aprobado" />
        <StatCard icon={TicketCheck} label="Aprobadas" value={purchases.filter((purchase) => purchase.status === "Aprobado").length} hint="Con números asignados" />
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Estado de rifas</h2>
        <div className="grid gap-4 xl:grid-cols-3">
          {raffles.map((raffle) => {
            const percent = Math.round((raffle.sold / raffle.total) * 100);
            const complete = raffle.sold >= raffle.total;
            return <article key={raffle.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-xl font-semibold">{raffle.name}</h3><p className="text-xs text-muted-foreground">{raffle.prize}</p></div><StatusBadge status={complete ? "Cerrada" : "Activa"} /></div>
              <div className="mt-4 flex justify-between text-xs font-semibold tabular-nums"><span>{raffle.sold} / {raffle.total}</span><span>{percent}%</span></div>
              <Progress value={percent} className="mt-2" />
              <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold-deep">{complete ? "RIFA COMPLETAMENTE VENDIDA — LISTA PARA SORTEO" : raffle.closing}</p>
              {raffle.id === "efectivo" && !complete && <Button variant="velvet" className="mt-4 w-full" onClick={() => setSoldOut(true)}>Simular venta completa</Button>}
            </article>;
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Participaciones</h2>
        {purchases.map((purchase) => {
          const approved = purchase.status === "Aprobado";
          return <article key={purchase.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-xl font-semibold">{purchase.id}</h3><StatusBadge status={purchase.status} /></div><p className="mt-1 text-sm text-muted-foreground">{purchase.customer} · {purchase.raffleName} · {purchase.packageLabel}</p><p className="mt-2 text-xs text-muted-foreground">Creado: {purchase.createdAt} · Comprobante: {purchase.receipt}</p></div>
              {!approved && <div className="grid gap-2 sm:grid-cols-2"><Button variant="velvet" disabled={purchase.status === "En revisión"} onClick={() => review(purchase.id)}>Iniciar revisión</Button><Button variant="fortune" onClick={() => approve(purchase.id)}>Aprobar y asignar</Button></div>}
            </div>
            <div className="mt-4 rounded-info border border-gold/30 bg-surface p-4">
              {approved ? <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-status-success"><CheckCircle2 className="h-4 w-4" /> Números asignados tras aprobación</p><div className="mt-3 flex flex-wrap gap-2">{purchase.numbers.map((number) => <strong key={number} className="rounded-full border border-gold/50 bg-card px-3 py-2 font-mono tabular-nums">{number}</strong>)}</div><p className="mt-3 text-xs text-muted-foreground">{purchase.verifiedAt} · {purchase.reviewer}</p></div> : <p className="flex items-center gap-2 text-sm font-semibold text-status-pending"><EyeOff className="h-4 w-4" /> PAGO PENDIENTE · números no asignados ni revelados</p>}
            </div>
          </article>;
        })}
      </section>
      <WarningNote>Aprobar el comprobante asigna números aleatorios. No se revelan ni reservan números durante PAGO PENDIENTE.</WarningNote>
    </PanelShell>
  );
}

function generateNumbers(count: number) {
  return Array.from({ length: count }, (_, index) => String(26318 + index * 619).padStart(5, "0").slice(-5));
}