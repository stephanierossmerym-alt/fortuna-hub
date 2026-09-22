import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Search, Trophy, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Brand } from "@/components/brand/brand";
import { GoldDivider, GoldRibbon, PillarsRow, SectionTitle } from "@/components/brand/ornaments";
import { RaffleCard } from "@/components/common/raffle-card";
import { SiteFoot } from "@/components/common/pieces";
import { Button } from "@/components/ui/button";
import { draws } from "@/data/draws";
import { specialRaffles } from "@/data/special-raffles";
import { results } from "@/data/results";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ross Fortuna — Rifas diarias y rifas especiales" },
      { name: "description", content: "Compra tu número de las rifas diarias Matutina y Noche, participa en las rifas especiales y consulta resultados en Ross Fortuna." },
      { property: "og:title", content: "Ross Fortuna — Tu momento. Tu suerte. Tu fortuna." },
      { property: "og:description", content: "Rifas diarias, rifas especiales, premios reales y una comunidad ganadora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portal,
});

function Portal() {
  const lastResult = results[0];
  return (
    <AppShell className="space-y-14 py-8 sm:space-y-20">
      <section className="relative isolate overflow-hidden rounded-card border border-gold/30 bg-card/75 px-5 py-12 shadow-ticket sm:px-12 sm:py-16">
        <GoldRibbon />
        <GoldRibbon position="bottom" />
        <div className="clover-watermark -left-16 top-1/4" aria-hidden>♣</div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Brand variant="full" className="mx-auto max-w-lg" />
            <p className="font-script -rotate-6 text-center text-3xl leading-tight text-gold-deep sm:text-5xl">
              Más que sorteos,<br />grandes historias.
            </p>
          </div>
          <GoldDivider className="mx-auto mt-8 max-w-2xl" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="fortune" size="lg">
              <Link to="/jugar">Comprar <ArrowRight /></Link>
            </Button>
            <Button asChild variant="velvet" size="lg">
              <Link to="/jugar" search={{ invitado: true }}>Continuar como invitado</Link>
            </Button>
          </div>
          <PillarsRow />
          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.34em] text-gold-deep sm:text-sm">
            Juega · Participa · Gana
          </p>
          <SiteFoot />
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Rifas diarias">Sorteos abiertos hoy</SectionTitle>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {draws.map((draw) => (
            <article key={draw.id} className="rounded-card border border-gold/35 bg-card p-6 shadow-warm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-semibold text-foreground">{draw.name}</h3>
                  <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
                    Juega con {draw.lottery} {draw.time}
                  </p>
                </div>
                <span className="rounded-full border border-status-success/40 bg-status-success-soft px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-status-success">
                  Abierto
                </span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-gold-deep" strokeWidth={1.6} /> Cierra a las {draw.closesAt} · {draw.days}
              </p>
              <Button asChild variant="fortune" className="mt-5 w-full">
                <Link to="/jugar" search={{ sorteo: draw.id }}>Jugar {draw.name}</Link>
              </Button>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild variant="velvet" className="w-full">
            <Link to="/resultados"><Trophy /> Ver resultados</Link>
          </Button>
          <Button asChild variant="velvet" className="w-full">
            <Link to="/consultar"><Search /> Consultar mis tickets</Link>
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Último resultado publicado: {lastResult?.drawName} · {lastResult?.date}
        </p>
      </section>

      <section>
        <SectionTitle eyebrow="Rifas especiales">Premios que cambian historias</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialRaffles.map((raffle) => <RaffleCard key={raffle.id} raffle={raffle} />)}
        </div>
      </section>

      <section className="rounded-card border border-gold/35 bg-surface px-6 py-10 text-center">
        <SectionTitle eyebrow="Tu cuenta">Guarda tus tickets, premios y saldo</SectionTitle>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Crear una cuenta no es obligatorio para comprar. Con cuenta conservas tus tickets, premios y saldo en web, Android e iPhone.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="fortune"><Link to="/acceso"><UserRound /> Crear cuenta o ingresar</Link></Button>
          <Button asChild variant="velvet"><Link to="/cuenta">Ver inicio del cliente</Link></Button>
        </div>
      </section>
    </AppShell>
  );
}
