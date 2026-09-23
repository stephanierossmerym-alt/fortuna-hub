import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, ShieldCheck, Store } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionTitle, GoldDivider } from "@/components/brand/ornaments";
import { WarningNote, ConfirmCheck } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/panel/")({
  head: () => ({
    meta: [
      { title: "Acceso a paneles internos — Ross Fortuna" },
      { name: "description", content: "Ingreso con verificación en dos pasos a los paneles de Trabajador y Administración de Ross Fortuna." },
      { property: "og:title", content: "Paneles internos — Ross Fortuna" },
      { property: "og:description", content: "Verificación en dos pasos para trabajadores y administradores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PanelAccess,
});

function PanelAccess() {
  const [step, setStep] = useState<1 | 2>(1);
  const [code, setCode] = useState("");
  const verified = code.trim() === "504217";

  return (
    <AppShell className="mx-auto max-w-2xl space-y-8">
      <SectionTitle eyebrow="Uso interno">Acceso a paneles</SectionTitle>
      <p className="text-center text-sm text-muted-foreground">
        El ingreso de trabajadores y administradores exige verificación en dos pasos.
      </p>
      <GoldDivider />

      <section className="rounded-card border border-gold/40 bg-card p-6 shadow-warm">
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input id="usuario" autoComplete="username" placeholder="RF-07" defaultValue="RF-07" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clave">Clave</Label>
              <Input id="clave" type="password" autoComplete="current-password" defaultValue="••••••••" />
            </div>
            <Button variant="fortune" className="w-full" onClick={() => setStep(2)}>
              Continuar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código de verificación</Label>
              <Input
                id="codigo"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="6 dígitos"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
              />
              <p className="text-xs text-muted-foreground">Demostración: el código enviado al teléfono registrado es 504217.</p>
            </div>
            {verified && <ConfirmCheck title="Identidad verificada" description="Elige el panel al que deseas ingresar." />}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="velvet" asChild disabled={!verified}>
                <Link to="/panel/trabajador" disabled={!verified}>
                  <Store /> Trabajador
                </Link>
              </Button>
              <Button variant="fortune" asChild disabled={!verified}>
                <Link to="/panel/admin" disabled={!verified}>
                  <ShieldCheck /> Administración
                </Link>
              </Button>
            </div>
            <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>
              <KeyRound /> Volver
            </Button>
          </div>
        )}
      </section>

      <WarningNote>Solo un Administrador autorizado puede verificar una participación.</WarningNote>
    </AppShell>
  );
}
