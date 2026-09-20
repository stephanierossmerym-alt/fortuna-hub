import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Brand } from "@/components/brand/brand";
import { GoldDivider } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Ross Fortuna — Fundación visual" },
    { name: "description", content: "Base visual Marble & Gold Luxe y ticket digital de Ross Fortuna." },
    { property: "og:title", content: "Ross Fortuna — Fundación visual" },
    { property: "og:description", content: "Base visual Marble & Gold Luxe y ticket digital de Ross Fortuna." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <AppShell className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-10"><div className="relative w-full max-w-3xl overflow-hidden rounded-card border border-gold/30 bg-card/75 px-6 py-12 text-center shadow-ticket sm:px-12 sm:py-16"><div className="clover-watermark -left-16 top-1/3" aria-hidden>♣</div><Brand variant="full" className="relative mx-auto max-w-lg" /><p className="font-script mt-6 -rotate-3 text-3xl text-gold-deep sm:text-5xl">Más que sorteos, grandes historias.</p><GoldDivider className="mx-auto mt-7 max-w-lg" /><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Fundación visual, componentes de marca y ticket digital preparados para revisión.</p><Button asChild variant="fortune" size="lg" className="mt-7"><Link to="/guia">Abrir guía visual <ArrowRight /></Link></Button></div></AppShell>;
}
