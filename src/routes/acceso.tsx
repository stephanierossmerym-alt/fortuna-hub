import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Brand } from "@/components/brand/brand";
import { GoldDivider } from "@/components/brand/ornaments";
import { ConfirmCheck } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Crear cuenta o ingresar — Ross Fortuna" },
      { name: "description", content: "Ingresa a tu cuenta Ross Fortuna, crea una nueva o continúa como invitado para comprar en segundos." },
      { property: "og:title", content: "Acceso — Ross Fortuna" },
      { property: "og:description", content: "Ingresa, crea tu cuenta o continúa como invitado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Acceso,
});

function Acceso() {
  const [sent, setSent] = useState<"login" | "signup" | null>(null);

  return (
    <AppShell className="flex justify-center">
      <div className="w-full max-w-lg">
        <Brand variant="full" priority className="mx-auto max-w-40 sm:max-w-52" />
        <GoldDivider className="mx-auto mt-4 max-w-sm" />

        <div className="mt-8 rounded-card border border-gold/35 bg-card p-6 shadow-warm">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Ingresar</TabsTrigger>
              <TabsTrigger value="signup">Crear cuenta</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-phone">Teléfono</Label>
                <Input id="login-phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="0991234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-code">Clave</Label>
                <Input id="login-code" type="password" autoComplete="current-password" placeholder="••••••" />
              </div>
              <Button variant="fortune" className="w-full" onClick={() => setSent("login")}>Ingresar</Button>
              {sent === "login" && <ConfirmCheck title="Sesión simulada iniciada" description="Los accesos reales llegan en una fase posterior." />}
            </TabsContent>

            <TabsContent value="signup" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Nombre</Label>
                <Input id="signup-name" autoComplete="name" placeholder="Nombre y apellido" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Teléfono</Label>
                <Input id="signup-phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="0991234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-mail">Correo (opcional)</Label>
                <Input id="signup-mail" type="email" autoComplete="email" placeholder="correo@ejemplo.com" />
              </div>
              <Button variant="fortune" className="w-full" onClick={() => setSent("signup")}>Crear cuenta</Button>
              {sent === "signup" && <ConfirmCheck title="Cuenta simulada creada" description="Guardarás tickets, premios y saldo en web, Android e iPhone." />}
            </TabsContent>
          </Tabs>

          <p className="mt-6 flex items-start gap-2 rounded-info border border-gold/35 bg-surface p-4 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
            Administración y caja usan verificación en dos pasos.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">¿Prefieres comprar sin cuenta?</p>
          <Button asChild variant="velvet" className="mt-3 w-full">
            <Link to="/jugar" search={{ invitado: true }}>Continuar como invitado <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
