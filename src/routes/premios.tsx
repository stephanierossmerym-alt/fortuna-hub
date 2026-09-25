import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownToLine, KeyRound, Lock, Trophy, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customerAccount } from "@/data/account";
import { maskCode, prizes as seedPrizes, withdrawals as seedW, type Prize, type Withdrawal } from "@/data/prizes";

export const Route = createFileRoute("/premios")({
  head: () => ({
    meta: [
      { title: "Mis premios y retiros — Ross Fortuna" },
      { name: "description", content: "Premios ganados, vencimientos, acreditación a saldo y solicitudes de retiro con su seguimiento." },
      { property: "og:title", content: "Mis premios y retiros — Ross Fortuna" },
      { property: "og:description", content: "Retira tu premio o déjalo en tu saldo Ross Fortuna." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Premios,
});

const me = customerAccount.name;
const flow: Withdrawal["status"][] = ["Solicitado", "En revisión", "Aprobado", "Pagado"];

function Premios() {
  const [prizes, setPrizes] = useState<Prize[]>(seedPrizes.filter((p) => p.customer === me || p.guest));
  const [balance, setBalance] = useState(customerAccount.balance);
  const [items, setItems] = useState<Withdrawal[]>(seedW.filter((w) => w.customer === me));
  const [amount, setAmount] = useState("");
  const reserved = items.filter((w) => ["Solicitado", "En revisión", "Aprobado"].includes(w.status)).reduce((s, w) => s + w.amount, 0);

  const toBalance = (p: Prize) => {
    setPrizes((c) => c.map((x) => (x.id === p.id ? { ...x, status: "Acreditado a saldo" } : x)));
    setBalance((b) => b + p.amount);
  };
  const withdrawPrize = (p: Prize) => {
    setPrizes((c) => c.map((x) => (x.id === p.id ? { ...x, status: "Retiro solicitado" } : x)));
    setItems((c) => [{ id: `RT-${320 + c.length}`, customer: me, amount: p.amount, destination: "Banco Guayaquil ••• 4187", requestedAt: "Hoy · ahora", status: "Solicitado", history: [{ at: "Hoy · ahora", status: "Solicitado", by: me }] }, ...c]);
  };
  const requestFromBalance = () => {
    const v = Number(amount);
    if (!v || v > balance) return;
    setBalance((b) => b - v);
    setItems((c) => [{ id: `RT-${320 + c.length}`, customer: me, amount: v, destination: "Banco Guayaquil ••• 4187", requestedAt: "Hoy · ahora", status: "Solicitado", history: [{ at: "Hoy · ahora", status: "Solicitado", by: me }] }, ...c]);
    setAmount("");
  };
  const cancel = (w: Withdrawal) => {
    setItems((c) => c.map((x) => (x.id === w.id ? { ...x, status: "Cancelado", history: [...x.history, { at: "Hoy · ahora", status: "Cancelado", by: me }] } : x)));
    setBalance((b) => b + w.amount);
  };

  return (
    <AppShell className="space-y-10">
      <SectionTitle eyebrow={me}>Mis premios</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo disponible" value={`$${balance.toFixed(2)}`} hint="Incluye premios acreditados" />
        <StatCard icon={Lock} label="Reservado por retiros" value={`$${reserved.toFixed(2)}`} hint="No disponible mientras la solicitud esté activa" />
        <StatCard icon={Trophy} label="Premios" value={prizes.length} hint="Ganados, pagados y vencidos" />
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {prizes.map((p) => (
          <article key={p.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-deep">{p.suerte} · N° {p.number}</p>
                <p className="font-display text-3xl font-semibold tabular-nums">${p.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{p.ticketId} · {p.drawName}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-1 text-xs">
              <dt className="text-muted-foreground">Generado</dt><dd className="text-right">{p.generatedAt}</dd>
              <dt className="text-muted-foreground">Caduca</dt><dd className="text-right">{p.expiresAt}</dd>
              <dt className="flex items-center gap-1 text-muted-foreground"><KeyRound className="h-3 w-3" /> Código secreto</dt><dd className="text-right font-mono tracking-widest">{maskCode(p.secretCode)}</dd>
            </dl>
            {p.status === "Vencido" && <p className="mt-3 text-xs text-status-expired">Este premio venció sin ser reclamado dentro del plazo de 8 días.</p>}
            {(p.status === "Ganador" || p.status === "Pendiente") && (
              p.guest ? (
                <div className="mt-4 space-y-2">
                  <Button variant="fortune" className="w-full" onClick={() => withdrawPrize(p)}><ArrowDownToLine /> Retirar</Button>
                  <p className="text-xs text-muted-foreground">Compra de invitado: para dejarlo en saldo debes crear y verificar tu cuenta. <Link to="/acceso" className="font-semibold text-gold-deep underline">Crear cuenta</Link></p>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="fortune" onClick={() => withdrawPrize(p)}>Retirar</Button>
                  <Button variant="velvet" onClick={() => toBalance(p)}>Dejar en mi saldo</Button>
                </div>
              )
            )}
          </article>
        ))}
      </section>

      <section className="rounded-card border border-gold/35 bg-surface p-5 sm:p-6">
        <h2 className="font-display text-2xl font-semibold">Solicitar retiro de saldo</h2>
        <p className="mt-1 text-sm text-muted-foreground">El importe queda reservado mientras la solicitud esté activa.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input inputMode="decimal" placeholder="Monto en USD" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} className="min-h-12" />
          <Button variant="fortune" disabled={!Number(amount) || Number(amount) > balance} onClick={requestFromBalance}>Solicitar retiro</Button>
        </div>
        {Number(amount) > balance && <WarningNote>El monto supera tu saldo disponible.</WarningNote>}
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold">Mis retiros</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {items.map((w) => (
            <article key={w.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{w.id} · <span className="tabular-nums">${w.amount.toFixed(2)}</span></p>
                  <p className="text-xs text-muted-foreground">{w.destination} · {w.requestedAt}</p>
                </div>
                <StatusBadge status={w.status} />
              </div>
              <ol className="mt-3 flex flex-wrap gap-1 text-[0.65rem] uppercase tracking-[0.12em]">
                {flow.map((s) => (
                  <li key={s} className={w.history.some((h) => h.status === s) ? "rounded-full bg-gold-light/40 px-2 py-1 text-gold-deep" : "rounded-full px-2 py-1 text-muted-foreground"}>{s}</li>
                ))}
              </ol>
              {w.status === "Solicitado" && <Button variant="ghost" size="sm" className="mt-3" onClick={() => cancel(w)}>Cancelar solicitud</Button>}
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
