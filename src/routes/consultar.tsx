import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle } from "@/components/brand/ornaments";
import { ConfirmCheck, WarningNote } from "@/components/common/pieces";
import { TicketDigital } from "@/components/ticket/ticket-digital";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { guestLookups } from "@/data/account";
import { ticketVariants } from "@/data/tickets";

export const Route = createFileRoute("/consultar")({
  head: () => ({
    meta: [
      { title: "Consultar mis tickets — Ross Fortuna" },
      { name: "description", content: "Consulta tus tickets de invitado con tu código de compra y tu teléfono, mediante verificación segura en dos pasos." },
      { property: "og:title", content: "Consultar mis tickets — Ross Fortuna" },
      { property: "og:description", content: "Verificación segura en dos pasos para ver tus tickets sin cuenta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultar,
});

function Consultar() {
  const [stage, setStage] = useState<"identify" | "verify" | "result">("identify");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const match = guestLookups.find((item) => item.code.toLowerCase() === code.trim().toLowerCase() && phone.trim().endsWith(item.phoneLast4));
  const ticket = ticketVariants.find((item) => item.id === match?.ticketId);

  return (
    <AppShell className="space-y-8">
      <SectionTitle eyebrow="Invitados">Consultar mis tickets</SectionTitle>

      <div className="mx-auto w-full max-w-lg rounded-card border border-gold/35 bg-card p-6 shadow-warm">
        {stage === "identify" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Necesitamos dos datos: el código de compra o de ticket y el teléfono con el que se registró la compra.
            </p>
            <div className="space-y-2">
              <Label htmlFor="code">Código de compra o ticket</Label>
              <Input id="code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="RF-4587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0991234187" />
            </div>
            <Button
              variant="fortune"
              className="w-full"
              onClick={() => {
                if (!match) return setError("No encontramos una compra con ese código y ese teléfono.");
                setError("");
                setStage("verify");
              }}
            >
              Enviar código de verificación
            </Button>
            {error && <p role="alert" className="text-sm font-semibold text-status-danger">{error}</p>}
            <WarningNote>Con un teléfono o correo solo no se pueden consultar compras ajenas: siempre pedimos el código y una verificación adicional.</WarningNote>
            <p className="rounded-info border border-gold/35 bg-surface p-3 text-xs text-muted-foreground">
              Datos de prueba: código <strong>RF-4587</strong>, teléfono terminado en <strong>4187</strong>, código de verificación <strong>204815</strong>.
            </p>
          </div>
        )}

        {stage === "verify" && (
          <div className="space-y-4">
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
              Enviamos un código al teléfono terminado en {match?.phoneLast4}.
            </p>
            <div className="space-y-2">
              <Label htmlFor="otp">Código de verificación</Label>
              <Input id="otp" inputMode="numeric" value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="204815" />
            </div>
            <Button
              variant="fortune"
              className="w-full"
              onClick={() => {
                if (otp.trim() !== match?.verificationCode) return setError("Código incorrecto. Revisa e intenta de nuevo.");
                setError("");
                setStage("result");
              }}
            >
              Verificar
            </Button>
            {error && <p role="alert" className="text-sm font-semibold text-status-danger">{error}</p>}
          </div>
        )}

        {stage === "result" && <ConfirmCheck title="Verificación correcta" description="Estos son los tickets asociados a tu compra." />}
      </div>

      {stage === "result" && ticket && <TicketDigital ticket={ticket} showWorkerActions={false} />}
    </AppShell>
  );
}
