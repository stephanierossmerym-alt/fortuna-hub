import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CircleDollarSign, Hash, Plus, ShieldCheck } from "lucide-react";
import { PanelShell } from "@/components/layout/panel-shell";
import { adminNav } from "@/components/layout/panel-nav";
import { SectionTitle } from "@/components/brand/ornaments";
import { StatusBadge } from "@/components/brand/status-badge";
import { StatCard, WarningNote } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { initialFortuneNumbers, type FortuneNumber } from "@/data/special-raffles";

export const Route = createFileRoute("/panel/admin/numeros-fortuna")({
  head: () => ({ meta: [
    { title: "Números Fortuna — Administración Ross Fortuna" },
    { name: "description", content: "Configuración simulada de números premiados y valores sin asignación a clientes." },
    { property: "og:title", content: "Números Fortuna — Ross Fortuna" },
    { property: "og:description", content: "Configuración administrativa de números premiados y valores." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AdminFortuneNumbers,
});

function AdminFortuneNumbers() {
  const [numbers, setNumbers] = useState<FortuneNumber[]>(initialFortuneNumbers);
  const [number, setNumber] = useState("");
  const [prize, setPrize] = useState("100");
  const activeValue = numbers.filter((item) => item.active).reduce((sum, item) => sum + item.prize, 0);

  const addNumber = () => {
    const amount = Number(prize);
    if (number.length !== 5 || !Number.isFinite(amount) || amount <= 0 || numbers.some((item) => item.number === number)) return;
    setNumbers((current) => [{ id: `NF-${number}`, number, prize: amount, active: true, createdAt: "Ahora" }, ...current]);
    setNumber("");
  };

  const toggle = (id: string, active: boolean) => setNumbers((current) => current.map((item) => item.id === id ? { ...item, active } : item));

  return (
    <PanelShell role="Administración" subtitle="Configuración de premios instantáneos" items={adminNav}>
      <SectionTitle eyebrow="Premios instantáneos" className="text-left">Números Fortuna</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Hash} label="Configurados" value={numbers.length} hint="Números únicos de cinco cifras" />
        <StatCard icon={ShieldCheck} label="Activos" value={numbers.filter((item) => item.active).length} hint="Participan en la validación" />
        <StatCard icon={CircleDollarSign} label="Premios activos" value={`$${activeValue.toFixed(2)}`} hint="Valor total configurado" />
      </div>

      <section className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
        <h2 className="font-display text-2xl font-semibold">Agregar Número Fortuna</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
          <div className="space-y-2"><Label htmlFor="fortune-number">Número de 5 cifras</Label><Input id="fortune-number" inputMode="numeric" maxLength={5} value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, ""))} placeholder="00000" /></div>
          <div className="space-y-2"><Label htmlFor="fortune-prize">Premio USD</Label><Input id="fortune-prize" inputMode="decimal" value={prize} onChange={(event) => setPrize(event.target.value)} /></div>
          <Button variant="fortune" disabled={number.length !== 5 || Number(prize) <= 0 || numbers.some((item) => item.number === number)} onClick={addNumber}><Plus /> Agregar</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Configuración vigente</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {numbers.map((item) => <article key={item.id} className="rounded-card border border-gold/35 bg-card p-5 shadow-warm">
            <div className="flex items-start justify-between gap-3"><div><p className="font-mono text-3xl font-bold tabular-nums">{item.number}</p><p className="mt-1 font-display text-xl font-semibold text-gold-deep">Premio ${item.prize.toFixed(2)}</p></div><StatusBadge status={item.active ? "Activa" : "Pausada"} /></div>
            <p className="mt-3 text-xs text-muted-foreground">Configurado: {item.createdAt}</p>
            <label className="mt-4 flex min-h-12 items-center justify-between gap-3 rounded-info border border-gold/30 bg-surface px-4"><span className="text-xs font-bold uppercase tracking-[0.13em] text-gold-deep">Número activo</span><Switch checked={item.active} onCheckedChange={(active) => toggle(item.id, active)} /></label>
          </article>)}
        </div>
      </section>
      <WarningNote>Números Fortuna configura qué números reciben un premio y su valor. Nunca define a qué cliente se asignará un número.</WarningNote>
    </PanelShell>
  );
}