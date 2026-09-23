import { createFileRoute } from "@tanstack/react-router";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { staff } from "@/data/panel";

export const Route = createFileRoute("/panel/admin/equipo")({
  head: () => ({
    meta: [
      { title: "Equipo y permisos — Ross Fortuna" },
      { name: "description", content: "Trabajadores y administradores con sus permisos y su estado activo o inactivo." },
      { property: "og:title", content: "Equipo y permisos — Ross Fortuna" },
      { property: "og:description", content: "Cada permiso define qué puede hacer cada persona." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminTeam,
});

function AdminTeam() {
  return (
    <PanelShell role="Administración" subtitle="Personas y permisos" items={adminNav}>
      <SectionTitle eyebrow="Equipo" className="text-left">Trabajadores y administradores</SectionTitle>

      <div className="grid gap-4 lg:grid-cols-2">
        {staff.map((member) => (
          <article key={member.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-xl font-semibold">{member.name}</p>
              <span className={`rounded-full border px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] ${member.active ? "border-status-success/40 bg-status-success-soft text-status-success" : "border-status-expired/40 bg-status-expired-soft text-status-expired"}`}>
                {member.active ? "Activo" : "Inactivo"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{member.role} · {member.phone}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {member.permissions.map((permission) => (
                <li key={permission} className="rounded-full border border-gold/45 bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-gold-deep">
                  {permission}
                </li>
              ))}
            </ul>
            <Button variant="velvet" className="mt-4 w-full">Editar permisos</Button>
          </article>
        ))}
      </div>

      <WarningNote>Solo un Administrador autorizado puede verificar participaciones, anular después del resultado o publicar resultados.</WarningNote>
    </PanelShell>
  );
}
