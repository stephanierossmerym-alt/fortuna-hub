import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeDollarSign, Banknote, BriefcaseBusiness, PackageCheck, Plus } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { vendorNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { MoneyTrace, OriginTag, StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { initialContractLots, vendorProfile, vendorSales } from "@/data/sales-network";

export const Route = createFileRoute("/panel/vendedor/")({
  head: () => ({
    meta: [
      { title: "Panel de Vendedor — Ross Fortuna" },
      { name: "description", content: "Ventas, cobros, contratas y comisiones del vendedor Ross Fortuna." },
      { property: "og:title", content: "Panel de Vendedor — Ross Fortuna" },
      { property: "og:description", content: "Trazabilidad de ventas, cobros, contratas y comisiones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VendorPanel,
});

function VendorPanel() {
  const sold = vendorSales.reduce((sum, sale) => sum + sale.amount, 0);
  const collected = vendorSales.reduce((sum, sale) => sum + sale.collected, 0);
  const commission = vendorSales.reduce((sum, sale) => sum + sale.commission, 0);
  const available = initialContractLots.filter((lot) => lot.status === "Activa").reduce((sum, lot) => sum + lot.contracted - lot.sold, 0);

  return (
    <PanelShell role="Vendedor" subtitle={`${vendorProfile.name} · comisión base ${vendorProfile.commissionRate}%`} items={vendorNav}>
      <SectionTitle eyebrow="Red comercial" className="text-left">Mi operación</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BriefcaseBusiness} label="Vendido" value={`$${sold.toFixed(2)}`} hint="Vendido ≠ Cobrado" />
        <StatCard icon={Banknote} label="Cobrado" value={`$${collected.toFixed(2)}`} hint="Cobrado ≠ Pagado" />
        <StatCard icon={BadgeDollarSign} label="Comisión generada" value={`$${commission.toFixed(2)}`} hint="Solo ventas atribuibles al vendedor" />
        <StatCard icon={PackageCheck} label="Cupo disponible" value={available} hint="Contratado ≠ Vendido ≠ Cobrado" />
      </div>

      <div className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
        <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-deep">Trazabilidad de la venta</p>
        <MoneyTrace active="Cobrado" />
        <p className="mt-3 text-sm text-muted-foreground">Cada cobro y comisión conserva su venta de origen. Una venta directa de Ross Fortuna no genera comisión.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="fortune" asChild><Link to="/jugar"><Plus /> Nueva venta</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/vendedor/contratas">Gestionar contratas</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/vendedor/comisiones">Ver comisiones</Link></Button>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Ventas recientes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {vendorSales.map((sale) => (
            <article key={sale.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0"><p className="truncate font-display text-xl font-semibold">{sale.ticketId}</p><p className="text-xs text-muted-foreground">{sale.draw} · {sale.soldAt}</p></div>
                <StatusBadge status={sale.commissionStatus} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <TraceValue label="Vendido" value={`$${sale.amount.toFixed(2)}`} />
                <TraceValue label="Cobrado" value={`$${sale.collected.toFixed(2)}`} />
                <TraceValue label="Comisión" value={`$${sale.commission.toFixed(2)}`} />
              </div>
              <div className="mt-4"><OriginTag origin={sale.origin} /></div>
            </article>
          ))}
        </div>
      </section>

      <WarningNote>VENTA DIRECTA ROSS FORTUNA: sin comisión. Solo genera comisión lo registrado personalmente por el vendedor.</WarningNote>
    </PanelShell>
  );
}

function TraceValue({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-info bg-surface p-3"><p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-gold-deep">{label}</p><p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p></div>;
}