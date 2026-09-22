import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Ticket as TicketIcon } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { GoldBar, InfoBox } from "@/components/brand/info-box";
import { PurchaseStepper } from "@/components/common/purchase-stepper";
import { NumberPad } from "@/components/common/number-pad";
import { UploadReceipt } from "@/components/common/upload-receipt";
import { ConfirmCheck, MoneyTrace, OriginTag, WarningNote } from "@/components/common/pieces";
import { TicketDigital } from "@/components/ticket/ticket-digital";
import { StatusBadge } from "@/components/brand/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { draws, modalities, plansForModality, type Plan } from "@/data/draws";
import type { Ticket } from "@/data/tickets";
import { cn } from "@/lib/utils";

type Search = { invitado?: boolean | undefined; sorteo?: string | undefined };

export const Route = createFileRoute("/jugar")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    invitado: search["invitado"] === true || search["invitado"] === "true" ? true : undefined,
    sorteo: typeof search["sorteo"] === "string" ? search["sorteo"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Comprar tu número — Ross Fortuna" },
      { name: "description", content: "Elige sorteo, modalidad, plan de premios y tu número. Paga por transferencia y recibe tu ticket digital." },
      { property: "og:title", content: "Comprar tu número — Ross Fortuna" },
      { property: "og:description", content: "Rifa diaria: sorteo, modalidad, plan, número y ticket digital." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Jugar,
});

const steps = ["Datos", "Sorteo", "Modalidad", "Plan", "Número", "Valor", "Revisión", "Pago", "Ticket"];
const money = (value: number) => `$${value.toFixed(2)}`;

function Jugar() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guest] = useState(search.invitado ?? true);
  const [drawId, setDrawId] = useState(search.sorteo ?? "");
  const [modalityId, setModalityId] = useState("");
  const [planId, setPlanId] = useState("");
  const [number, setNumber] = useState("");
  const [value, setValue] = useState(3);
  const [accepted, setAccepted] = useState(false);
  const [receipt, setReceipt] = useState("");

  const draw = draws.find((item) => item.id === drawId);
  const modality = modalities.find((item) => item.id === modalityId);
  const plan = plansForModality(modalityId).find((item) => item.id === planId);

  const canContinue = [
    name.trim().length > 1 && phone.trim().length >= 7,
    Boolean(draw),
    Boolean(modality),
    Boolean(plan),
    Boolean(modality && number.length === modality.digits),
    value > 0,
    accepted,
    receipt.length > 0,
    true,
  ][step];

  const ticket: Ticket | null = draw && modality && plan
    ? {
        id: "RF-4602",
        drawName: draw.name,
        drawDate: "Sábado 12 de Septiembre del 2026",
        drawTime: draw.time,
        lottery: draw.lottery,
        number,
        code: "9683514402",
        value,
        purchaseDate: "Sábado 12 de Septiembre del 2026 · 18:39:16",
        expiresInDays: 8,
        note: draw.note,
        modality: modality.label,
        plan: plan.name,
        planVersion: plan.version,
        status: "En revisión",
        customer: guest ? `Invitado · ${name || "Sin nombre"}` : name,
        origin: "Venta directa Ross Fortuna",
        prizes: plan.prizes.map((prize) => ({ position: prize.position, name: prize.name, amount: prize.perDollar * value })),
      }
    : null;

  return (
    <AppShell className="space-y-8 pb-24">
      <SectionTitle eyebrow="Rifa diaria">Comprar mi número</SectionTitle>
      <PurchaseStepper steps={steps} current={step} />

      <div className="rounded-card border border-gold/35 bg-card p-5 shadow-warm sm:p-8">
        {step === 0 && (
          <div className="mx-auto max-w-md space-y-4">
            <p className="text-sm text-muted-foreground">
              {guest ? "Compra como invitado: solo necesitamos tus datos básicos." : "Confirma tus datos de contacto."}
            </p>
            <div className="space-y-2">
              <Label htmlFor="buyer-name">Nombre</Label>
              <Input id="buyer-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellido" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyer-phone">Teléfono</Label>
              <Input id="buyer-phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0991234567" />
            </div>
            <p className="text-xs text-muted-foreground">
              Los invitados no tienen billetera permanente hasta crear y verificar una cuenta.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {draws.map((item) => (
              <OptionCard key={item.id} selected={drawId === item.id} onClick={() => setDrawId(item.id)} title={item.name} subtitle={`Juega con ${item.lottery} ${item.time}`} detail={`Cierra ${item.closesAt} · ${item.days}`} />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-3">
            {modalities.filter((item) => item.active).map((item) => (
              <OptionCard
                key={item.id}
                selected={modalityId === item.id}
                onClick={() => { setModalityId(item.id); setPlanId(""); setNumber(""); }}
                title={item.label}
                subtitle={`${item.digits} dígitos`}
                detail={item.digits === 2 ? "Hasta la 7.ª suerte" : item.digits === 3 ? "Hasta la 10.ª suerte" : "Suertes configurables"}
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {plansForModality(modalityId).map((item) => (
                <OptionCard key={item.id} selected={planId === item.id} onClick={() => setPlanId(item.id)} title={item.name} subtitle={`Versión ${item.version}`} detail={`1.ª suerte: ${money(item.prizes[0]?.perDollar ?? 0)} por cada $1`} />
              ))}
            </div>
            {plan && <PlanTable plan={plan} />}
          </div>
        )}

        {step === 4 && modality && (
          <div>
            <p className="text-center text-sm text-muted-foreground">Elige tu número de {modality.label}.</p>
            <NumberPad className="mt-6" value={number} digits={modality.digits} onChange={setNumber} />
          </div>
        )}

        {step === 5 && (
          <div className="mx-auto max-w-md space-y-4">
            <Label htmlFor="value">Valor jugado (USD)</Label>
            <Input id="value" type="number" inputMode="decimal" min={1} step={1} value={value} onChange={(event) => setValue(Math.max(0, Number(event.target.value)))} />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 5, 10].map((preset) => (
                <Button key={preset} size="sm" variant={value === preset ? "fortune" : "velvet"} onClick={() => setValue(preset)}>{money(preset)}</Button>
              ))}
            </div>
            {plan && <PlanTable plan={plan} value={value} />}
          </div>
        )}

        {step === 6 && draw && modality && plan && (
          <div className="mx-auto max-w-xl space-y-5">
            <h3 className="text-center text-sm font-bold uppercase tracking-[0.22em] text-gold-deep">Revisa tu jugada antes de confirmar</h3>
            <div className="grid overflow-hidden rounded-info border border-gold/50 sm:grid-cols-2">
              <InfoBox label="Sorteo:" value={`${draw.name} · ${draw.lottery} ${draw.time}`} className="border-b border-gold/30 sm:border-r" />
              <InfoBox label="Modalidad:" value={modality.label} className="border-b border-gold/30" />
              <InfoBox label="Plan:" value={`${plan.name} · ${plan.version}`} className="border-b border-gold/30 sm:border-r" />
              <InfoBox label="Número:" value={number} className="border-b border-gold/30" />
              <InfoBox label="Valor:" value={money(value)} className="sm:border-r" />
              <InfoBox label="Total:" value={money(value)} />
            </div>
            <WarningNote>
              Una vez confirmada la compra, no se permiten cambios, cancelaciones ni reembolsos por arrepentimiento, número incorrecto, plan equivocado o cambio de opinión.
            </WarningNote>
            <label className="flex items-start gap-3 rounded-info border border-gold/40 bg-surface p-4 text-sm">
              <Checkbox checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} aria-label="Confirmo mi jugada" />
              <span>Confirmo que revisé mi jugada y acepto la regla de no cambios ni reembolsos.</span>
            </label>
          </div>
        )}

        {step === 7 && (
          <div className="mx-auto max-w-xl space-y-5">
            <div className="overflow-hidden rounded-info border border-gold/50">
              <GoldBar left={<>Pago por transferencia</>} right={<>Total: {money(value)}</>} />
              <div className="grid sm:grid-cols-2">
                <InfoBox label="Banco:" value="Banco Fortuna · Cta. ahorros 2200 4187" className="border-b border-gold/30 sm:border-r" />
                <InfoBox label="Titular:" value="Ross Fortuna S.A." className="border-b border-gold/30" />
                <InfoBox label="Referencia:" value="Tu número de teléfono" className="sm:border-r" />
                <InfoBox label="Estado inicial:" value={<StatusBadge status="Pendiente" />} />
              </div>
            </div>
            <UploadReceipt onUploaded={setReceipt} />
            <WarningNote>Hora de pago ≠ hora de aprobación administrativa. Subir el comprobante no confirma la participación hasta su aprobación.</WarningNote>
          </div>
        )}

        {step === 8 && ticket && (
          <div className="space-y-6">
            <ConfirmCheck title="Comprobante recibido — participación en revisión" description="Te avisaremos cuando Administración verifique tu pago." />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <MoneyTrace active="Cobrado" />
              <OriginTag origin="Venta directa Ross Fortuna" />
            </div>
            <TicketDigital ticket={ticket} showWorkerActions={false} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="velvet"><Link to="/consultar">Consultar mis tickets</Link></Button>
              <Button asChild variant="fortune"><Link to="/">Volver al inicio</Link></Button>
            </div>
          </div>
        )}

        {step === 8 && !ticket && (
          <p className="text-center text-sm text-muted-foreground">Completa los pasos anteriores para generar tu ticket.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="velvet" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
          <ArrowLeft /> Atrás
        </Button>
        {step < steps.length - 1 && (
          <Button variant="fortune" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>
            {step === 6 ? "Confirmar" : step === 7 ? "Enviar comprobante" : "Continuar"} <ArrowRight />
          </Button>
        )}
        {step === steps.length - 1 && (
          <span className="flex items-center gap-2 text-sm font-semibold text-gold-deep"><TicketIcon className="h-4 w-4" /> Ticket generado</span>
        )}
      </div>
    </AppShell>
  );
}

function OptionCard({ selected, onClick, title, subtitle, detail }: { selected: boolean; onClick: () => void; title: string; subtitle: string; detail: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-24 rounded-info border p-5 text-left transition-colors active:scale-[0.99]",
        selected ? "border-gold bg-gold-light/35" : "border-gold/35 bg-surface",
      )}
    >
      <p className="font-display text-2xl font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold-deep">{subtitle}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </button>
  );
}

function PlanTable({ plan, value }: { plan: Plan; value?: number }) {
  return (
    <div className="overflow-hidden rounded-info border border-gold/50">
      <GoldBar left={<>{plan.name} · {plan.version}</>} right={value ? <>Con {money(value)} jugados</> : <>Por cada $1</>} />
      <div className="divide-y divide-border/70 px-4">
        {plan.prizes.map((prize) => (
          <div key={prize.position} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 py-2 text-sm">
            <strong className="text-center tabular-nums text-gold-deep">{prize.position}</strong>
            <span>{prize.name}</span>
            <span className="font-semibold tabular-nums">{money(prize.perDollar * (value ?? 1))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
