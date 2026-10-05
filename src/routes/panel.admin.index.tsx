import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, FileCheck2, Gift, Ticket as TicketIcon, Trophy } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { MoneyTrace, StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { receipts, auditTrail } from "@/data/panel";

export const Route = createFileRoute("/panel/admin/")({
  head: () => ({
    meta: [
      { title: "Panel de Administración — Ross Fortuna" },
      { name: "description", content: "Verificación de comprobantes, tickets, sorteos, planes, resultados y auditoría de Ross Fortuna." },
      { property: "og:title", content: "Panel de Administración — Ross Fortuna" },
      { property: "og:description", content: "Control y trazabilidad de toda la operación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const pending = receipts.filter((item) => item.status === "Pendiente" || item.status === "En revisión");

  return (
    <PanelShell role="Administración" subtitle="Administrador RF-01 · verificado en dos pasos" items={adminNav}>
      <SectionTitle eyebrow="Control general" className="text-left">Resumen</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FileCheck2} label="Comprobantes por revisar" value={pending.length} hint="Hora de pago ≠ hora de aprobación administrativa." />
        <StatCard icon={TicketIcon} label="Tickets del día" value={42} hint="Reservado ≠ Vendido ≠ Cobrado ≠ Pagado" />
        <StatCard icon={Trophy} label="Resultados publicados" value={3} hint="Publicación oficial registrada en auditoría" />
        <StatCard icon={ClipboardList} label="Movimientos de auditoría" value={auditTrail.length} hint="Quién · qué · cuándo · antes · después" />
      </div>

      <div className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
        <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-deep">Trazabilidad del dinero</p>
        <MoneyTrace active="Cobrado" />
        <p className="mt-3 text-sm text-muted-foreground">Dinero recibido ≠ Uso de saldo ≠ Venta. Cada etapa se registra por separado.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Button variant="fortune" asChild><Link to="/panel/admin/comprobantes">Revisar comprobantes</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/tickets">Buscar tickets</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/resultados">Publicar resultados</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/sorteos">Sorteos y planes</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/rifas-especiales"><Gift /> Rifas especiales</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/numeros-fortuna">Números Fortuna</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/equipo">Equipo y permisos</Link></Button>
        <Button variant="velvet" asChild><Link to="/panel/admin/auditoria">Ver auditoría</Link></Button>
      </div>

      <WarningNote>Aprobar una participación después de publicados los resultados queda marcado en el historial de auditoría.</WarningNote>
    </PanelShell>
  );
}
