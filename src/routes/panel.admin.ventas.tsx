import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeDollarSign, BriefcaseBusiness, CreditCard, Users } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { initialContractLots, vendors, type ContractLot } from "@/data/sales-network";

export const Route = createFileRoute("/panel/admin/ventas")({
  head: () => ({ meta: [
    { title: "Red de ventas — Administración Ross Fortuna" },
    { name: "description", content: "Administración simulada de vendedores, comisiones, contratas y cuentas por cobrar." },
    { property: "og:title", content: "Red de ventas — Ross Fortuna" },
    { property: "og:description", content: "Control administrativo de vendedores, contratas y crédito." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AdminSalesNetwork,
});

function AdminSalesNetwork() {
  const [lots, setLots] = useState<ContractLot[]>(initialContractLots);
  const receivable = lots.reduce((sum, lot) => sum + lot.receivable, 0);
  const authorize = (id: string) => setLots((current) => current.map((lot) => lot.id === id ? { ...lot, creditStatus: "Autorizado", receivable: Math.max(lot.receivable, (lot.sold - lot.collected) * lot.unitPrice) } : lot));

  return (
    <PanelShell role="Administración" subtitle="Vendedores, comisiones y contratas" items={adminNav}>
      <SectionTitle eyebrow="Control comercial" className="text-left">Red de ventas</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Vendedores activos" value={vendors.filter((vendor) => vendor.active).length} hint="Permisos individuales" />
        <StatCard icon={BriefcaseBusiness} label="Contratas activas" value={lots.filter((lot) => lot.status === "Activa").length} hint="Cupo reservado" />
        <StatCard icon={BadgeDollarSign} label="Comisión base máxima" value={`${Math.max(...vendors.map((vendor) => vendor.commissionRate))}%`} hint="Configurable por vendedor" />
        <StatCard icon={CreditCard} label="Por cobrar" value={`$${receivable.toFixed(2)}`} hint="Crédito autorizado" />
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Vendedores</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vendors.map((vendor) => (
            <article key={vendor.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><div><p className="font-semibold">{vendor.name}</p><p className="text-xs text-muted-foreground">{vendor.phone}</p></div><StatusBadge status={vendor.active ? "Activa" : "Pausada"} /></div>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums">{vendor.commissionRate}%</p>
              <p className="text-xs text-muted-foreground">Comisión configurada por venta atribuible.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Crédito y cuentas por cobrar</h2>
        {lots.map((lot) => (
          <article key={lot.id} className="grid gap-4 rounded-card border border-gold/35 bg-card p-5 shadow-warm lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0"><p className="font-semibold">{lot.id} · {lot.draw}</p><p className="mt-1 text-sm text-muted-foreground">Vendido {lot.sold} · Cobrado ${lot.collected.toFixed(2)} · Cuenta por cobrar ${lot.receivable.toFixed(2)}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-gold-deep">Crédito: {lot.creditStatus}</p></div>
            <Button variant="velvet" disabled={lot.creditStatus === "Autorizado" || lot.status === "Cerrada"} onClick={() => authorize(lot.id)}>Autorizar crédito</Button>
          </article>
        ))}
      </section>

      <WarningNote>Solo Administración puede autorizar crédito. La autorización genera una Cuenta por cobrar; no convierte el cupo en dinero cobrado.</WarningNote>
    </PanelShell>
  );
}