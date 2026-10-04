import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, PackageCheck, ReceiptText, Ticket } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { vendorNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { initialContractLots, vendorProfile, type ContractLot } from "@/data/sales-network";

export const Route = createFileRoute("/panel/vendedor/contratas")({
  head: () => ({ meta: [
    { title: "Contratas del vendedor — Ross Fortuna" },
    { name: "description", content: "Cupos contratados, vendidos y cobrados con trazabilidad Ross Fortuna." },
    { property: "og:title", content: "Contratas — Ross Fortuna" },
    { property: "og:description", content: "Control de cupo reservado, ventas y cobros del vendedor." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContractsPage,
});

function ContractsPage() {
  const [lots, setLots] = useState<ContractLot[]>(initialContractLots);
  const contracted = lots.reduce((sum, lot) => sum + lot.contracted, 0);
  const sold = lots.reduce((sum, lot) => sum + lot.sold, 0);
  const collected = lots.reduce((sum, lot) => sum + lot.collected, 0);
  const receivable = lots.reduce((sum, lot) => sum + lot.receivable, 0);

  const sell = (id: string, all: boolean) => setLots((current) => current.map((lot) => {
    if (lot.id !== id || lot.status !== "Activa") return lot;
    const available = Math.max(0, lot.contracted - lot.sold);
    const quantity = all ? available : Math.min(1, available);
    const nextSold = lot.sold + quantity;
    return { ...lot, sold: nextSold, status: nextSold >= lot.contracted ? "Cerrada" : lot.status };
  }));

  return (
    <PanelShell role="Vendedor" subtitle={`${vendorProfile.name} · cupos asignados`} items={vendorNav}>
      <SectionTitle eyebrow="Cupo reservado" className="text-left">Mis contratas</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PackageCheck} label="Contratado" value={contracted} hint="Cupo reservado" />
        <StatCard icon={Ticket} label="Vendido" value={sold} hint="Contratado ≠ Vendido" />
        <StatCard icon={Banknote} label="Cobrado" value={`$${collected.toFixed(2)}`} hint="Vendido ≠ Cobrado" />
        <StatCard icon={ReceiptText} label="Cuenta por cobrar" value={`$${receivable.toFixed(2)}`} hint="Crédito autorizado por Administración" />
      </div>

      <p className="rounded-info border border-gold/45 bg-gold-light/30 p-4 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-gold-deep">Contratado ≠ Vendido ≠ Cobrado</p>

      <div className="grid gap-5 xl:grid-cols-2">
        {lots.map((lot) => {
          const available = Math.max(0, lot.contracted - lot.sold);
          return (
            <article key={lot.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0"><p className="font-display text-2xl font-semibold">{lot.id}</p><p className="text-sm text-muted-foreground">{lot.draw} · {lot.modality} · {lot.plan}</p></div>
                <StatusBadge status={lot.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric label="Contratado" value={lot.contracted} />
                <Metric label="Vendido" value={lot.sold} />
                <Metric label="Cobrado" value={`$${lot.collected.toFixed(2)}`} />
                <Metric label="Disponible" value={available} />
              </div>
              <div className="mt-4 rounded-info border border-border bg-surface p-4 text-sm">
                <p className="font-bold uppercase tracking-[0.12em] text-gold-deep">Crédito: {lot.creditStatus}</p>
                <p className="mt-1 text-muted-foreground">Cuenta por cobrar asociada: ${lot.receivable.toFixed(2)}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Button variant="fortune" disabled={available === 0} onClick={() => sell(lot.id, false)}>Vender / sacar ticket</Button>
                <Button variant="velvet" disabled={available === 0} onClick={() => sell(lot.id, true)}>Vender todas</Button>
              </div>
            </article>
          );
        })}
      </div>

      <WarningNote>El crédito de una contrata solo puede autorizarlo un Administrador y siempre crea una Cuenta por cobrar trazable.</WarningNote>
    </PanelShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-info bg-surface p-3 text-center"><p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-gold-deep">{label}</p><p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p></div>;
}