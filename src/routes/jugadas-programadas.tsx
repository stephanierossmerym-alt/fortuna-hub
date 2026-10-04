import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, History, Pause, Play, Plus, Wallet, X } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customerAccount } from "@/data/account";
import { initialScheduledPlays, LOW_BALANCE_ALERT, type ScheduledPlay } from "@/data/scheduled-plays";

export const Route = createFileRoute("/jugadas-programadas")({
  head: () => ({ meta: [
    { title: "Jugadas programadas — Ross Fortuna" },
    { name: "description", content: "Crea y administra jugadas recurrentes simuladas con control visible de saldo e historial." },
    { property: "og:title", content: "Jugadas programadas — Ross Fortuna" },
    { property: "og:description", content: "Programaciones, ejecuciones e historial con saldo protegido." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ScheduledPlaysPage,
});

function ScheduledPlaysPage() {
  const [plays, setPlays] = useState<ScheduledPlay[]>(initialScheduledPlays);
  const [showForm, setShowForm] = useState(false);
  const [draw, setDraw] = useState<"Matutina 13:00" | "Noche 20:00">("Noche 20:00");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("3");
  const [days, setDays] = useState("Lunes a sábado");

  const toggle = (id: string) => setPlays((current) => current.map((play) => {
    if (play.id !== id || play.status === "Cancelada" || play.status === "Ejecutada" || play.status === "No ejecutada — saldo insuficiente") return play;
    const nextStatus = play.status === "Activa" ? "Pausada" : "Activa";
    return { ...play, status: nextStatus, nextRun: nextStatus === "Activa" ? `Próximo ${draw}` : "Pausada por el cliente", history: [{ id: `H-${Date.now()}`, when: "Ahora", change: nextStatus, detail: `${nextStatus} por Rossmery M.` }, ...play.history] };
  }));

  const cancel = (id: string) => setPlays((current) => current.map((play) => play.id === id ? { ...play, status: "Cancelada", nextRun: "Cancelada", history: [{ id: `H-${Date.now()}`, when: "Ahora", change: "Cancelada", detail: "Cancelada por Rossmery M.; no se generarán nuevos tickets." }, ...play.history] } : play));

  const createPlay = () => {
    const parsedAmount = Number(amount);
    if (number.length < 2 || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return;
    const newPlay: ScheduledPlay = {
      id: `JP-${110 + plays.length}`,
      draw,
      days,
      number,
      modality: `${number.length} cifras`,
      plan: number.length === 2 ? "Plan Clásico v2" : number.length === 3 ? "Plan Triple v1" : "Plan Máximo v1",
      amount: parsedAmount,
      nextRun: `Próxima ejecución · ${draw}`,
      status: "Activa",
      history: [{ id: `H-${Date.now()}`, when: "Ahora", change: "Creada", detail: `Programación activa para ${days.toLowerCase()}.` }],
    };
    setPlays((current) => [newPlay, ...current]);
    setNumber("");
    setShowForm(false);
  };

  return (
    <AppShell className="space-y-8">
      <SectionTitle eyebrow="Automatización segura">Jugadas programadas</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo disponible" value={`$${customerAccount.balance.toFixed(2)}`} hint="Nunca se permite saldo negativo" />
        <StatCard icon={CalendarClock} label="Activas" value={plays.filter((play) => play.status === "Activa").length} hint="Se revisa el saldo antes de ejecutar" />
        <StatCard icon={History} label="Historial" value={plays.reduce((sum, play) => sum + play.history.length, 0)} hint="Cada cambio queda registrado" />
      </div>

      {customerAccount.balance < LOW_BALANCE_ALERT
        ? <WarningNote>Tu saldo está por debajo de ${LOW_BALANCE_ALERT}.00. Revisa tus jugadas programadas.</WarningNote>
        : <p className="rounded-info border border-gold/35 bg-surface p-4 text-sm text-muted-foreground">Alerta de saldo bajo configurada en ${LOW_BALANCE_ALERT}.00 · saldo actual ${customerAccount.balance.toFixed(2)}.</p>}

      <Button variant="fortune" onClick={() => setShowForm((current) => !current)}><Plus /> Nueva programación</Button>

      {showForm && (
        <section className="rounded-card border border-gold/40 bg-card p-5 shadow-warm">
          <h2 className="font-display text-2xl font-semibold">Programar una jugada</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Sorteo"><Select value={draw} onValueChange={(value) => setDraw(value as typeof draw)}><SelectTrigger className="h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Matutina 13:00">Matutina 13:00</SelectItem><SelectItem value="Noche 20:00">Noche 20:00</SelectItem></SelectContent></Select></Field>
            <Field label="Frecuencia"><Select value={days} onValueChange={setDays}><SelectTrigger className="h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Lunes a sábado">Lunes a sábado</SelectItem><SelectItem value="Martes, jueves y sábado">Martes, jueves y sábado</SelectItem><SelectItem value="Sábado">Solo sábado</SelectItem></SelectContent></Select></Field>
            <Field label="Número"><Input inputMode="numeric" autoComplete="off" maxLength={4} value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, ""))} placeholder="2 a 4 cifras" className="h-12" /></Field>
            <Field label="Valor por ejecución"><Input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} className="h-12" /></Field>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button variant="fortune" disabled={number.length < 2 || number.length > 4} onClick={createPlay}>Guardar programación</Button><Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button></div>
        </section>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {plays.map((play) => <ScheduledCard key={play.id} play={play} onToggle={() => toggle(play.id)} onCancel={() => cancel(play.id)} />)}
      </div>

      <WarningNote>NO EJECUTADA — SALDO INSUFICIENTE: no genera ticket, no registra venta, no descuenta parcialmente y nunca deja saldo negativo.</WarningNote>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>;
}

function ScheduledCard({ play, onToggle, onCancel }: { play: ScheduledPlay; onToggle: () => void; onCancel: () => void }) {
  const editable = play.status === "Activa" || play.status === "Pausada";
  return (
    <article className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><div className="min-w-0"><p className="font-display text-2xl font-semibold">{play.id} · N° {play.number}</p><p className="text-sm text-muted-foreground">{play.draw} · {play.days}</p></div><StatusBadge status={play.status} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3"><Detail label="Plan" value={play.plan} /><Detail label="Por ejecución" value={`$${play.amount.toFixed(2)}`} /><Detail label="Modalidad" value={play.modality} /><Detail label="Próxima" value={play.nextRun} /></div>
      {editable && <div className="mt-4 grid gap-3 sm:grid-cols-2"><Button variant="velvet" onClick={onToggle}>{play.status === "Activa" ? <Pause /> : <Play />}{play.status === "Activa" ? "Pausar" : "Reactivar"}</Button><Button variant="ghost" onClick={onCancel}><X /> Cancelar</Button></div>}
      <details className="mt-4 border-t border-gold/25 pt-4"><summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">Historial de cambios</summary><div className="mt-3 space-y-3">{play.history.map((entry) => <div key={entry.id} className="border-l-2 border-gold/40 pl-3"><p className="text-sm font-semibold">{entry.change} · {entry.when}</p><p className="text-xs text-muted-foreground">{entry.detail}</p></div>)}</div></details>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-info bg-surface p-3"><p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-gold-deep">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value}</p></div>;
}