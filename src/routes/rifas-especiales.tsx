import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Gift, ReceiptText, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GoldDivider, SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { RaffleCard } from "@/components/common/raffle-card";
import { ConfirmCheck, WarningNote } from "@/components/common/pieces";
import { UploadReceipt } from "@/components/common/upload-receipt";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialSpecialPurchases, specialRaffles, type RafflePackage, type SpecialPurchase } from "@/data/special-raffles";
import { cn } from "@/lib/utils";

type Search = { rifa?: string };

export const Route = createFileRoute("/rifas-especiales")({
  validateSearch: (search: Record<string, unknown>): Search => ({ rifa: typeof search["rifa"] === "string" ? search["rifa"] : undefined }),
  head: () => ({ meta: [
    { title: "Rifas Especiales — Ross Fortuna" },
    { name: "description", content: "Participa en rifas especiales Ross Fortuna con asignación aleatoria tras aprobar el pago." },
    { property: "og:title", content: "Rifas Especiales — Ross Fortuna" },
    { property: "og:description", content: "Premios especiales, paquetes de oportunidades y números protegidos hasta aprobar el pago." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SpecialRafflesPage,
});

function SpecialRafflesPage() {
  const search = Route.useSearch();
  const initial = specialRaffles.find((raffle) => raffle.id === search.rifa && raffle.sold < raffle.total);
  const [raffleId, setRaffleId] = useState(initial?.id ?? "");
  const [packageId, setPackageId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [receipt, setReceipt] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [purchase, setPurchase] = useState<SpecialPurchase | null>(null);
  const raffle = specialRaffles.find((item) => item.id === raffleId);
  const pack = raffle?.packages.find((item) => item.id === packageId);
  const existing = initialSpecialPurchases[0];

  const submit = () => {
    if (!raffle || !pack || name.trim().length < 2 || phone.length < 7 || !receipt || !accepted) return;
    setPurchase({ id: "RF-4611", raffleId: raffle.id, raffleName: raffle.name, customer: `Invitado · ${name}`, phone, packageLabel: pack.label, chances: pack.chances, total: pack.price, receipt, status: "Pago pendiente", createdAt: "Ahora", numbers: [] });
  };

  return (
    <AppShell className="space-y-10">
      <SectionTitle eyebrow="Premios especiales">Rifas Especiales</SectionTitle>
      <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-muted-foreground">Elige un paquete y registra tu pago. Tus números se asignan aleatoriamente únicamente después de la aprobación administrativa.</p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {specialRaffles.map((item) => <RaffleCard key={item.id} raffle={item} />)}
      </div>

      <section className="rounded-card border border-gold/35 bg-card p-5 shadow-warm sm:p-8">
        <SectionTitle eyebrow="Compra segura">Selecciona tu participación</SectionTitle>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {specialRaffles.map((item) => {
            const complete = item.sold >= item.total;
            return <Button key={item.id} variant={raffleId === item.id ? "fortune" : "velvet"} disabled={complete} onClick={() => { setRaffleId(item.id); setPackageId(""); setPurchase(null); }}>{complete ? `${item.name} · Agotada` : item.name}</Button>;
          })}
        </div>

        {raffle && !purchase && (
          <div className="mx-auto mt-8 max-w-2xl space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {raffle.packages.map((item) => <PackageOption key={item.id} pack={item} selected={item.id === packageId} onSelect={() => setPackageId(item.id)} />)}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="special-name">Nombre</Label><Input id="special-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="special-phone">Teléfono</Label><Input id="special-phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
            </div>
            {pack && <div className="rounded-info border border-gold/40 bg-surface p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">Revisión</p><p className="mt-2 font-semibold">{raffle.name} · {pack.label} · ${pack.price.toFixed(2)}</p><p className="mt-1 text-sm text-muted-foreground">Los números aún no se asignan ni se revelan.</p></div>}
            <UploadReceipt onUploaded={setReceipt} />
            <WarningNote>Subir el comprobante no confirma la participación. PAGO PENDIENTE hasta la aprobación administrativa.</WarningNote>
            <label className="flex items-start gap-3 rounded-info border border-gold/35 bg-surface p-4 text-sm"><Checkbox checked={accepted} onCheckedChange={(value) => setAccepted(value === true)} /><span>Confirmo el paquete, el total y que los números serán asignados aleatoriamente después de aprobar el pago.</span></label>
            <Button variant="fortune" className="w-full" disabled={!pack || name.trim().length < 2 || phone.length < 7 || !receipt || !accepted} onClick={submit}>Enviar participación</Button>
          </div>
        )}

        {purchase && <PurchaseReceipt purchase={purchase} onApprove={() => setPurchase((current) => current ? { ...current, status: "Aprobado", verifiedAt: "Ahora", reviewer: "Administrador RF-01", numbers: generateNumbers(current.chances) } : current)} />}
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="Participación registrada">Ejemplo pendiente</SectionTitle>
        <PurchaseReceipt purchase={existing} onApprove={() => undefined} demoOnly />
      </section>
    </AppShell>
  );
}

function PackageOption({ pack, selected, onSelect }: { pack: RafflePackage; selected: boolean; onSelect: () => void }) {
  return <Button variant={selected ? "fortune" : "velvet"} className="h-auto min-h-20 justify-between px-5" onClick={onSelect}><span>{pack.label}</span><strong>${pack.price.toFixed(2)}</strong></Button>;
}

function PurchaseReceipt({ purchase, onApprove, demoOnly = false }: { purchase: SpecialPurchase; onApprove: () => void; demoOnly?: boolean }) {
  const approved = purchase.status === "Aprobado";
  return (
    <article className="mx-auto mt-8 max-w-2xl rounded-card border border-gold/45 bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-display text-2xl font-semibold">{purchase.id}</p><p className="text-sm text-muted-foreground">{purchase.raffleName} · {purchase.packageLabel}</p></div><StatusBadge status={purchase.status} /></div>
      <GoldDivider className="my-5" />
      <div className="grid gap-3 sm:grid-cols-3"><ReceiptValue icon={ReceiptText} label="Total" value={`$${purchase.total.toFixed(2)}`} /><ReceiptValue icon={Gift} label="Oportunidades" value={String(purchase.chances)} /><ReceiptValue icon={CheckCircle2} label="Comprobante" value={purchase.receipt} /></div>
      <div className={cn("mt-5 rounded-info border p-5 text-center", approved ? "border-status-success/40 bg-status-success-soft" : "border-status-pending/40 bg-status-pending-soft")}>
        {approved ? <><Sparkles className="mx-auto h-7 w-7 text-gold-deep" /><p className="mt-2 text-xs font-bold uppercase tracking-[0.17em] text-gold-deep">Números asignados</p><div className="mt-3 flex flex-wrap justify-center gap-2">{purchase.numbers.map((number) => <strong key={number} className="rounded-full border border-gold/50 bg-card px-3 py-2 font-mono tabular-nums">{number}</strong>)}</div></> : <><EyeOff className="mx-auto h-7 w-7 text-status-pending" /><p className="mt-2 font-extrabold uppercase tracking-[0.16em] text-status-pending">PAGO PENDIENTE</p><p className="mt-2 text-sm text-muted-foreground">Números no revelados. La asignación aleatoria ocurre tras la aprobación.</p></>}
      </div>
      {!approved && !demoOnly && <Button variant="velvet" className="mt-5 w-full" onClick={onApprove}>Simular aprobación administrativa</Button>}
      {approved && <p className="mt-4 text-xs text-muted-foreground">Verificado: {purchase.verifiedAt} · {purchase.reviewer}</p>}
    </article>
  );
}

function ReceiptValue({ icon: Icon, label, value }: { icon: typeof Gift; label: string; value: string }) {
  return <div className="min-w-0 rounded-info bg-card p-3"><Icon className="h-4 w-4 text-gold-deep" /><p className="mt-2 text-[0.55rem] font-bold uppercase tracking-[0.12em] text-gold-deep">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value}</p></div>;
}

function generateNumbers(count: number) {
  return Array.from({ length: count }, (_, index) => String(19472 + index * 731).padStart(5, "0").slice(-5));
}