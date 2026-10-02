import { useState } from "react";
import { CalendarDays, Clock3, FileDown, FileText, Hourglass, Printer, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/brand/brand";
import { GoldDivider, GoldRibbon } from "@/components/brand/ornaments";
import { GoldBar, InfoBox } from "@/components/brand/info-box";
import { StatusBadge } from "@/components/brand/status-badge";
import type { Ticket } from "@/data/tickets";

const qrGrid = [
  "111111101011101111111", "100000101100101000001", "101110101011101011101", "101110100110101011101", "101110101101101011101", "100000100010101000001", "111111101010101111111", "000000001101100000000", "110011111010111010110", "011100001111001100101", "101011101001101011100", "010101010110010110011", "111001111011111001010", "000000001100101010101", "111111101011111010111", "100000101110001110001", "101110101011101011101", "101110100100011101001", "101110101111110111110", "100000101001010010101", "111111101110111101011",
];

function QrMock() {
  return <svg viewBox="0 0 21 21" className="h-full w-full" role="img" aria-label="Código QR ilustrativo del ticket">{qrGrid.flatMap((row, y) => row.split("").map((cell, x) => cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null))}</svg>;
}

function Barcode({ code }: { code: string }) {
  return <div><div className="barcode h-9 w-full" aria-hidden /><span className="sr-only">Código de barras {code}</span></div>;
}

export function TicketDigital({ ticket, showWorkerActions = true }: { ticket: Ticket; showWorkerActions?: boolean }) {
  const [notice, setNotice] = useState("");
  const money = (value: number) => `$${value.toFixed(2)}`;
  return (
    <div className="mx-auto w-full max-w-[46rem] print:max-w-none">
      <article className="ticket-paper marble relative isolate overflow-hidden rounded-ticket border border-gold/45 bg-card shadow-ticket">
        <GoldRibbon /><GoldRibbon position="bottom" />
        <div className="clover-watermark left-[-5rem] top-[32%]" aria-hidden>♣</div><div className="clover-watermark bottom-[17%] right-[-4rem]" aria-hidden>♣</div>
        <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-10">
          <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 sm:grid-cols-[7rem_minmax(0,1fr)_7rem]">
            <p className="text-[0.48rem] font-semibold uppercase leading-[2.05] tracking-[0.24em] text-muted-foreground sm:text-[0.65rem]">Más<br />que<br />sorteos<br />grandes<br />historias</p>
            <Brand variant="full" className="mx-auto max-w-36 sm:max-w-48" />
            <p className="font-script -rotate-6 text-center text-xl leading-tight text-gold-deep sm:text-3xl">Juega<br />Participa<br />Gana ♡</p>
          </div>

          <div className="mt-7 grid overflow-hidden rounded-info border border-gold/70 bg-card/80 sm:grid-cols-[1.35fr_0.7fr_1.25fr]">
            <InfoBox icon={CalendarDays} label="Sorteo:" value={ticket.drawDate} className="border-b border-gold/35 sm:border-b-0 sm:border-r" />
            <div className="flex items-center justify-center border-b border-gold/35 p-3 text-center sm:border-b-0 sm:border-r"><div><p className="text-xs font-bold uppercase tracking-[0.18em]">N°</p><p className="font-ui text-6xl font-extrabold tabular-nums sm:text-7xl">{ticket.number}</p></div></div>
            <div className="p-4"><p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-deep">Código:</p><p className="mt-1 text-lg font-bold tabular-nums sm:text-xl">{ticket.code}</p><Barcode code={ticket.code} /></div>
          </div>

          <div className="mx-auto my-5 w-36 text-center sm:w-40"><div className="aspect-square rounded-xl border-2 border-gold-deep bg-card p-2 text-foreground"><QrMock /></div><p className="mt-2 text-[0.58rem] font-bold uppercase leading-relaxed tracking-[0.24em]">Escanea y verifica<br />tu ticket</p></div>

          <div className="overflow-hidden rounded-xl border border-gold/65 bg-card/80">
            <GoldBar left={<>Juega con {ticket.lottery} {ticket.drawTime}</>} right={<>Valor: {money(ticket.value)}</>} />
            <div className="divide-y divide-border/70 px-4">{ticket.prizes.map((prize) => <div key={prize.position} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 py-1.5 text-sm sm:text-base"><strong className="text-center tabular-nums">{prize.position}</strong><span>{prize.name}</span><span className="font-medium tabular-nums">{money(prize.amount)}</span></div>)}</div>
          </div>

          <div className="mt-5 grid sm:grid-cols-3"> 
            <InfoBox icon={Clock3} label="Compra:" value={ticket.purchaseDate} className="border-b border-gold/35 sm:border-b-0 sm:border-r" />
            <InfoBox icon={Hourglass} label="Caduca en:" value={`${ticket.expiresInDays} días`} className="border-b border-gold/35 sm:border-b-0 sm:border-r" />
            <InfoBox icon={FileText} label="Nota:" value={ticket.note} />
          </div>
          <GoldDivider className="mt-4" />
          <p className="mt-2 text-center text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold-deep">Juega · Participa · Gana</p>
        </div>
      </article>

      <div className="mt-4 rounded-info border border-gold/35 bg-card px-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="details" className="border-0"><AccordionTrigger className="min-h-12 uppercase tracking-[0.14em] text-gold-deep hover:no-underline">Detalles del ticket</AccordionTrigger><AccordionContent><dl className="grid gap-x-8 gap-y-4 pb-2 sm:grid-cols-2">{[["Ticket", ticket.id], ["Modalidad", ticket.modality], ["Plan", `${ticket.plan} · ${ticket.planVersion}`], ["Cliente", ticket.customer], ["Origen", ticket.origin], ...(ticket.seller ? [["Responsable", ticket.seller]] : [])].map(([label, value]) => <div key={label}><dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}<div><dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Estado</dt><dd className="mt-2"><StatusBadge status={ticket.status} /></dd></div></dl></AccordionContent></AccordionItem>
        </Accordion>
      </div>
      <div className="mt-4 grid gap-3 print:hidden sm:grid-cols-3">
        <Button variant="fortune" onClick={() => setNotice("Vista del ticket preparada para descargar.")}><FileDown />Descargar imagen</Button>
        <Button variant="velvet" onClick={() => setNotice(`Estado actual: ${ticket.status}.`)}><Search />Ver estado</Button>
        {showWorkerActions && <Button variant="ink" onClick={() => window.print()}><Printer />Imprimir</Button>}
      </div>
      {notice && <p role="status" className="mt-3 text-center text-sm font-medium text-gold-deep">{notice}</p>}
    </div>
  );
}
