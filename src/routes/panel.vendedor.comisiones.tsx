import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeDollarSign, Banknote, CheckCircle2 } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { vendorNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { OriginTag, StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { vendorProfile, vendorSales, type VendorSale } from "@/data/sales-network";

export const Route = createFileRoute("/panel/vendedor/comisiones")({
  head: () => ({ meta: [
    { title: "Mis comisiones — Ross Fortuna" },
    { name: "description", content: "Desglose simulado de comisiones por venta del vendedor Ross Fortuna." },
    { property: "og:title", content: "Mis comisiones — Ross Fortuna" },
    { property: "og:description", content: "Comisiones trazables por venta y origen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CommissionsPage,
});

function CommissionsPage() {
  const [sales, setSales] = useState<VendorSale[]>(vendorSales);
  const payable = sales.filter((sale) => sale.commissionStatus === "Aprobado").reduce((sum, sale) => sum + sale.commission, 0);
  const paid = sales.filter((sale) => sale.commissionStatus === "Pagado").reduce((sum, sale) => sum + sale.commission, 0);

  const simulateSettlement = () => setSales((current) => current.map((sale) => sale.commissionStatus === "Aprobado" ? { ...sale, commissionStatus: "Pagado" } : sale));

  return (
    <PanelShell role="Vendedor" subtitle={`${vendorProfile.name} · liquidación de comisiones`} items={vendorNav}>
      <SectionTitle eyebrow="Liquidación" className="text-left">Mis comisiones</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={BadgeDollarSign} label="Tasa base" value={`${vendorProfile.commissionRate}%`} hint="Aplicada por cada venta atribuible" />
        <StatCard icon={Banknote} label="Por pagar" value={`$${payable.toFixed(2)}`} hint="Aprobado ≠ Pagado" />
        <StatCard icon={CheckCircle2} label="Pagado" value={`$${paid.toFixed(2)}`} hint="Liquidaciones ya registradas" />
      </div>

      <div className="grid gap-4">
        {sales.map((sale) => (
          <article key={sale.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0"><p className="font-semibold">{sale.ticketId} · {sale.draw}</p><p className="mt-1 text-xs text-muted-foreground">Venta {sale.id} · {sale.soldAt}</p></div>
              <StatusBadge status={sale.commissionStatus} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-y border-gold/25 py-4 text-center">
              <Value label="Base vendida" value={`$${sale.amount.toFixed(2)}`} />
              <Value label="Tasa" value={`${sale.commissionRate}%`} />
              <Value label="Comisión" value={`$${sale.commission.toFixed(2)}`} />
            </div>
            <div className="mt-4"><OriginTag origin={sale.origin} /></div>
          </article>
        ))}
      </div>

      <Button variant="fortune" disabled={payable === 0} onClick={simulateSettlement}>Simular liquidación aprobada</Button>
      <WarningNote>VENTA DIRECTA ROSS FORTUNA no genera comisión. La comisión no existe hasta que la venta atribuible queda registrada.</WarningNote>
    </PanelShell>
  );
}

function Value({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-gold-deep">{label}</p><p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p></div>;
}