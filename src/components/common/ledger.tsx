import type { Movement } from "@/data/wallet";
import { cn } from "@/lib/utils";

const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(n).toFixed(2)}`;

export function Ledger({ items }: { items: Movement[] }) {
  return (
    <div>
      {/* Tarjetas en móvil */}
      <div className="grid gap-3 md:hidden">
        {items.map((m) => (
          <article key={m.id} className="rounded-info border border-gold/35 bg-card p-4 shadow-warm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-deep">{m.kind}</p>
                <p className="font-semibold text-foreground">{m.concept}</p>
                <p className="text-xs text-muted-foreground">{m.date} · {m.reference}</p>
              </div>
              <span className={cn("font-bold tabular-nums", m.amount < 0 ? "text-status-danger" : "text-status-success")}>{m.amount > 0 ? "+" : ""}{money(m.amount)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gold/20 pt-3 text-xs tabular-nums">
              <span className="text-muted-foreground">Saldo anterior <b className="text-foreground">{money(m.before)}</b></span>
              <span className="text-right text-muted-foreground">Saldo posterior <b className="text-foreground">{money(m.after)}</b></span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Registrado por {m.by}</p>
          </article>
        ))}
      </div>
      {/* Tabla en tablet/escritorio */}
      <div className="hidden overflow-hidden rounded-info border border-gold/35 bg-card md:block">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="p-3">Fecha</th><th className="p-3">Tipo</th><th className="p-3">Concepto</th>
              <th className="p-3 text-right">Importe</th><th className="p-3 text-right">Saldo anterior</th><th className="p-3 text-right">Saldo posterior</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {items.map((m) => (
              <tr key={m.id} className="border-t border-gold/20">
                <td className="p-3 text-muted-foreground">{m.date}</td>
                <td className="p-3 font-semibold text-gold-deep">{m.kind}</td>
                <td className="p-3">{m.concept}<span className="block text-xs text-muted-foreground">{m.reference} · {m.by}</span></td>
                <td className={cn("p-3 text-right font-bold", m.amount < 0 ? "text-status-danger" : "text-status-success")}>{m.amount > 0 ? "+" : ""}{money(m.amount)}</td>
                <td className="p-3 text-right">{money(m.before)}</td>
                <td className="p-3 text-right font-semibold">{money(m.after)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">El saldo nunca se sobrescribe: cada cambio queda como un movimiento con saldo anterior y posterior.</p>
    </div>
  );
}
