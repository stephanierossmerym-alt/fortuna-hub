import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand/brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type PanelNavItem = { label: string; to: string };

function NavList({ items, onNavigate }: { items: PanelNavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Navegación del panel">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to.split("/").length <= 2 }}
          activeProps={{ className: "border-gold/60 bg-gold-light/40 text-gold-deep" }}
          className="flex min-h-12 items-center rounded-button border border-transparent px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function PanelShell({
  role,
  subtitle,
  items,
  children,
  className,
}: {
  role: string;
  subtitle: string;
  items: PanelNavItem[];
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="marble min-h-dvh overflow-x-clip">
      <header className="safe-top sticky top-0 z-40 border-b border-gold/25 bg-background/90 backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)]">
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="velvet" size="icon" className="lg:hidden" aria-label="Abrir menú del panel">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[17rem] overflow-y-auto bg-card p-5">
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-xl">{role}</SheetTitle>
              </SheetHeader>
              <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>
              <NavList items={items} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link to="/" aria-label="Ross Fortuna, inicio" className="flex min-w-0 items-center gap-2">
            <Brand variant="monogram" priority className="w-9 shrink-0 lg:hidden" />
            <Brand variant="wordmark" priority className="hidden w-32 shrink-0 lg:block" />
          </Link>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-gold/50 bg-surface px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-gold-deep">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.7} /> {role}
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8 lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-card border border-gold/35 bg-card p-4 shadow-warm">
            <p className="mb-1 font-display text-lg font-semibold">{role}</p>
            <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>
            <NavList items={items} />
          </div>
        </aside>
        <main className={cn("min-w-0 space-y-8", className)}>{children}</main>
      </div>
    </div>
  );
}
