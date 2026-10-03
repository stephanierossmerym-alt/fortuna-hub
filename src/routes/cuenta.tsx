import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownToLine, CalendarClock, Gift, PlusCircle, Ticket as TicketIcon, Trophy, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatCard } from "@/components/common/pieces";
import { StatusBadge } from "@/components/brand/status-badge";
import { Button } from "@/components/ui/button";
import { customerAccount } from "@/data/account";
import { draws } from "@/data/draws";

export const Route = createFileRoute("/cuenta")({
  head: () => ({
    meta: [
      { title: "Mi inicio — Ross Fortuna" },
      { name: "description", content: "Tu saldo, tus tickets y tus accesos rápidos para jugar Matutina, Noche y rifas especiales en Ross Fortuna." },
      { property: "og:title", content: "Mi inicio — Ross Fortuna" },
      { property: "og:description", content: "Saldo, tickets y accesos rápidos del cliente Ross Fortuna." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cuenta,
});

const quickActions = [
  { label: "Jugar Matutina", icon: TicketIcon, to: "/jugar" as const, search: { sorteo: "matutina" } },
  { label: "Jugar Noche", icon: TicketIcon, to: "/jugar" as const, search: { sorteo: "noche" } },
  { label: "Rifas Especiales", icon: Gift, to: "/" as const, search: {} },
  { label: "Mis Tickets", icon: TicketIcon, to: "/consultar" as const, search: {} },
];


function Cuenta() {
  const account = customerAccount;
  return (
    <AppShell className="space-y-10">
      <SectionTitle eyebrow={`Hola, ${account.name}`}>Mi inicio</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo disponible" value={`$${account.balance.toFixed(2)}`} hint="Saldo Ross Fortuna" />
        <StatCard icon={TicketIcon} label="Mis tickets" value={account.tickets.length} hint="Incluye activos, ganadores y anulados" />
        <StatCard icon={Trophy} label="Premios" value="1" hint="Ticket ganador por validar" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Button key={action.label} asChild variant="velvet" className="w-full">
            <Link to={action.to} search={action.search}><action.icon /> {action.label}</Link>
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="fortune" asChild><Link to="/jugadas-programadas"><CalendarClock /> Programar mi jugada</Link></Button>
        <Button variant="velvet" asChild><Link to="/billetera"><PlusCircle /> Agregar fondos</Link></Button>
        <Button variant="velvet" asChild><Link to="/premios"><ArrowDownToLine /> Retirar</Link></Button>
      </div>
      <Button asChild variant="fortune" className="w-full"><Link to="/billetera"><Wallet /> Ir a mi billetera · agregar fondos</Link></Button>
      <Button asChild variant="velvet" className="w-full"><Link to="/premios"><Trophy /> Mis premios y retiros</Link></Button>
      <p className="text-center text-xs text-muted-foreground">Tus programaciones se ejecutan solo cuando existe saldo suficiente.</p>

      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Mis tickets</h2>
        <div className="mt-4 grid gap-3">
          {account.tickets.map((ticket) => (
            <article key={ticket.id} className="flex flex-wrap items-center justify-between gap-3 rounded-info border border-gold/35 bg-card p-4 shadow-warm">
              <div>
                <p className="font-semibold text-foreground">{ticket.id} · N° {ticket.number}</p>
                <p className="text-xs text-muted-foreground">{ticket.drawName} · {ticket.lottery} {ticket.drawTime} · {ticket.modality}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold tabular-nums">${ticket.value.toFixed(2)}</span>
                <StatusBadge status={ticket.status} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-card border border-gold/35 bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">Sorteos de hoy</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {draws.map((draw) => (
            <div key={draw.id} className="flex items-center justify-between gap-3 rounded-info border border-gold/35 bg-card p-4">
              <div>
                <p className="font-semibold">{draw.name}</p>
                <p className="text-xs text-muted-foreground">Cierra {draw.closesAt}</p>
              </div>
              <Button asChild size="sm" variant="fortune"><Link to="/jugar" search={{ sorteo: draw.id }}>Jugar</Link></Button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
