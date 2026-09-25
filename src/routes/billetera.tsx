import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, PlusCircle, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { UploadReceipt } from "@/components/common/upload-receipt";
import { NumberPad } from "@/components/common/number-pad";
import { Ledger } from "@/components/common/ledger";
import { Button } from "@/components/ui/button";
import { customerAccount } from "@/data/account";
import { LOW_BALANCE_ALERT, movements, topUps as seed, type TopUp } from "@/data/wallet";

export const Route = createFileRoute("/billetera")({
  head: () => ({
    meta: [
      { title: "Mi billetera — Ross Fortuna" },
      { name: "description", content: "Saldo disponible, recargas con comprobante y libro de movimientos con saldo anterior y posterior." },
      { property: "og:title", content: "Mi billetera — Ross Fortuna" },
      { property: "og:description", content: "Recargas, saldo y movimientos trazables en Ross Fortuna." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Billetera,
});

function Billetera() {
  const balance = customerAccount.balance;
  const reserved = customerAccount.reserved;
  const [items, setItems] = useState<TopUp[]>(seed.filter((t) => t.customer === customerAccount.name));
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState("");

  const submit = () => {
    const value = Number(amount);
    setItems((cur) => [
      { id: `RC-${2070 + cur.length}`, customer: customerAccount.name, amount: value, method: "Transferencia bancaria", createdAt: "Hoy · ahora", uploadedAt: file ? "Hoy · ahora" : null, verifiedPaymentTime: null, reviewer: null, reviewedAt: null, status: file ? "En revisión" : "Pendiente" },
      ...cur,
    ]);
    setOpen(false); setAmount(""); setFile("");
  };

  return (
    <AppShell className="space-y-10">
      <SectionTitle eyebrow={customerAccount.name}>Mi billetera</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo disponible" value={`$${balance.toFixed(2)}`} hint="Listo para jugar" />
        <StatCard icon={Lock} label="Saldo reservado" value={`$${reserved.toFixed(2)}`} hint="Por retiros en curso" />
        <StatCard icon={PlusCircle} label="Recargas en revisión" value={items.filter((i) => i.status === "En revisión").length} hint="Aún no suman al saldo" />
      </div>

      {balance <= LOW_BALANCE_ALERT + 5 && (
        <WarningNote>Tu saldo está cerca del mínimo de ${LOW_BALANCE_ALERT}.00 recomendado para tus jugadas programadas.</WarningNote>
      )}

      <section className="rounded-card border border-gold/35 bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">Agregar fondos</h2>
          {!open && <Button variant="fortune" onClick={() => setOpen(true)}><PlusCircle /> Nueva recarga</Button>}
        </div>
        <p className="mt-2 text-sm font-semibold text-foreground">Subir el comprobante no aumenta el saldo hasta su aprobación.</p>
        <p className="text-xs text-muted-foreground">Dinero recibido ≠ Uso de saldo ≠ Venta.</p>
        {open && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Monto a recargar (USD)</p>
              <p className="my-3 text-center font-display text-4xl font-semibold tabular-nums text-gold-deep">${amount || "0"}</p>
              <NumberPad value={amount} onChange={setAmount} digits={4} />
            </div>
            <div className="space-y-4">
              <UploadReceipt onUploaded={setFile} />
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="fortune" className="flex-1" disabled={!Number(amount)} onClick={submit}>Enviar recarga</Button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold">Mis recargas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {items.map((t) => (
            <article key={t.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{t.id} · <span className="tabular-nums">${t.amount.toFixed(2)}</span></p>
                  <p className="text-xs text-muted-foreground">{t.method}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <dt className="text-muted-foreground">Creada</dt><dd className="text-right">{t.createdAt}</dd>
                <dt className="text-muted-foreground">Comprobante cargado</dt><dd className="text-right">{t.uploadedAt ?? "—"}</dd>
                <dt className="text-muted-foreground">Hora verificada</dt><dd className="text-right">{t.verifiedPaymentTime ?? "—"}</dd>
                <dt className="text-muted-foreground">Revisor</dt><dd className="text-right">{t.reviewer ?? "—"}</dd>
                <dt className="text-muted-foreground">Revisión</dt><dd className="text-right">{t.reviewedAt ?? "—"}</dd>
              </dl>
              {t.note && <p className="mt-2 text-xs text-status-danger">Motivo: {t.note}</p>}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold">Libro de movimientos</h2>
        <Ledger items={[...movements].reverse()} />
      </section>
    </AppShell>
  );
}
