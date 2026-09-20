import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Brand } from "@/components/brand/brand";
import { GoldBar, InfoBox } from "@/components/brand/info-box";
import { GoldDivider, PillarsRow, SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { TicketDigital } from "@/components/ticket/ticket-digital";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { primaryTicket, type TicketStatus } from "@/data/tickets";

export const Route = createFileRoute("/guia")({
  head: () => ({ meta: [
    { title: "Guía visual — Ross Fortuna" },
    { name: "description", content: "Sistema visual Marble & Gold Luxe de Ross Fortuna." },
    { property: "og:title", content: "Guía visual — Ross Fortuna" },
    { property: "og:description", content: "Sistema visual Marble & Gold Luxe de Ross Fortuna." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: StyleGuide,
});

const statuses: TicketStatus[] = ["Pendiente", "En revisión", "Aprobado", "Rechazado", "Vencido", "Pagado", "Anulado", "Ganador"];

function StyleGuide() {
  const [confirmed, setConfirmed] = useState(false);
  return <AppShell>
    <header className="relative overflow-hidden rounded-card border border-gold/30 bg-card/70 px-5 py-10 text-center shadow-warm sm:px-10 sm:py-14">
      <div className="clover-watermark -left-12 -top-14" aria-hidden>♣</div>
      <Brand variant="full" className="relative mx-auto max-w-md" />
      <p className="font-script mx-auto mt-5 max-w-md -rotate-3 text-3xl text-gold-deep sm:text-4xl">Más que sorteos, grandes historias.</p>
      <GoldDivider className="mx-auto mt-6 max-w-md" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-gold-deep">Guía visual · Fase 0</p>
    </header>

    <section className="py-14"><SectionTitle eyebrow="Fundamentos">Marble & Gold Luxe</SectionTitle><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      ["Mármol", "bg-background"], ["Crema", "bg-surface"], ["Oro", "gold-metal"], ["Tinta", "bg-foreground"],
    ].map(([label, color]) => <Card key={label}><CardContent className="p-4"><div className={`h-24 rounded-info border border-gold/30 ${color}`} /><p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p></CardContent></Card>)}</div></section>

    <section className="pb-14"><SectionTitle eyebrow="Marca">Variantes del logotipo</SectionTitle><div className="mt-8 grid items-center gap-5 sm:grid-cols-3"><Card><CardContent className="flex min-h-48 items-center justify-center p-6"><Brand variant="full" /></CardContent></Card><Card><CardContent className="flex min-h-48 items-center justify-center p-6"><Brand variant="monogram" className="h-32 w-32" /></CardContent></Card><Card><CardContent className="flex min-h-48 items-center justify-center p-6"><Brand variant="wordmark" /></CardContent></Card></div></section>

    <section className="pb-14"><SectionTitle eyebrow="Interfaz">Controles y estados</SectionTitle><div className="mt-8 grid gap-5 lg:grid-cols-2"><Card><CardContent className="space-y-4 p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Botones</p><div className="flex flex-wrap gap-3"><Button variant="fortune">Comprar <ChevronRight /></Button><Button variant="velvet">Consultar</Button><Button variant="ink">Imprimir</Button><Button variant="ghost">Cancelar</Button><Button variant="destructive">Anular</Button></div></CardContent></Card><Card><CardContent className="space-y-4 p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Estados únicos</p><div className="flex flex-wrap gap-2">{statuses.map((status) => <StatusBadge key={status} status={status} />)}</div></CardContent></Card></div></section>

    <section className="pb-14"><div className="grid gap-5 lg:grid-cols-2"><Card><CardContent className="p-5 sm:p-7"><InfoBox label="Sorteo:" value="Sábado 12 de Septiembre del 2026" /><div className="mt-4 overflow-hidden rounded-xl border border-gold/50"><GoldBar left="Juega con LTT 20:00" right="Valor: $3.00" /><div className="p-4"><Progress value={75} /><p className="mt-2 text-sm font-semibold tabular-nums">750 / 1.000 vendidos · 75%</p></div></div></CardContent></Card><Card><CardContent className="p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Confirmación</p><button type="button" onClick={() => setConfirmed((value) => !value)} className="mt-5 flex min-h-12 w-full items-center gap-3 rounded-button border border-gold/45 bg-card px-4 text-left text-sm font-semibold active:scale-[0.98]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm border border-gold-deep text-gold-deep">{confirmed && <Check className="h-4 w-4" />}</span>He revisado los datos mostrados.</button><p className="mt-4 text-sm text-muted-foreground">Este control demuestra estados locales sin guardar datos reales.</p></CardContent></Card></div></section>

    <section className="pb-14"><PillarsRow /></section>
    <section className="pb-10"><SectionTitle eyebrow="Componente central">Ticket digital</SectionTitle><p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">Diseñado para pantalla, descarga e impresión, con trazabilidad visible.</p><div className="mt-8"><TicketDigital ticket={primaryTicket} /></div></section>
  </AppShell>;
}
