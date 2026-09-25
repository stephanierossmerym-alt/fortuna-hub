import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CircleUserRound, Home, Search, Ticket, Wallet } from "lucide-react";
import { Brand } from "@/components/brand/brand";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Inicio", to: "/" as const },
  { label: "Jugar", to: "/jugar" as const },
  { label: "Resultados", to: "/resultados" as const },
  { label: "Consultar", to: "/consultar" as const },
  { label: "Billetera", to: "/billetera" as const },
  { label: "Premios", to: "/premios" as const },
  { label: "Mi cuenta", to: "/cuenta" as const },
  { label: "Guía", to: "/guia" as const },
  { label: "Panel", to: "/panel" as const },
];

export function AppShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="marble min-h-dvh overflow-x-clip pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-0">
      <header className="safe-top sticky top-0 z-40 border-b border-gold/25 bg-background/88 backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)]">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Ross Fortuna, inicio" className="flex min-w-0 items-center gap-2">
            <Brand variant="monogram" className="h-12 w-12 shrink-0 sm:hidden" />
            <Brand variant="wordmark" className="hidden truncate sm:block" />
          </Link>
          <nav className="hidden items-center gap-2 sm:flex" aria-label="Navegación principal">
            {nav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "bg-surface text-gold-deep" }} className="flex min-h-12 items-center rounded-button px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}
          </nav>
        </div>
      </header>
      <main className={cn("mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8", className)}>{children}</main>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-gold/25 bg-background/94 px-2 pt-2 backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)] sm:hidden" aria-label="Navegación móvil">
        <Link to="/" className="mobile-nav-item" activeProps={{ className: "text-gold-deep" }}><Home /><span>Inicio</span></Link>
        <Link to="/jugar" className="mobile-nav-item" activeProps={{ className: "text-gold-deep" }}><Ticket /><span>Jugar</span></Link>
        <Link to="/consultar" className="mobile-nav-item" activeProps={{ className: "text-gold-deep" }}><Search /><span>Tickets</span></Link>
        <Link to="/billetera" className="mobile-nav-item" activeProps={{ className: "text-gold-deep" }}><Wallet /><span>Billetera</span></Link>
        <Link to="/cuenta" className="mobile-nav-item" activeProps={{ className: "text-gold-deep" }}><CircleUserRound /><span>Cuenta</span></Link>
      </nav>
    </div>
  );
}
