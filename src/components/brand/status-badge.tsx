import { Badge } from "@/components/ui/badge";
import type { TicketStatus } from "@/data/tickets";
import { cn } from "@/lib/utils";

export type AppStatus =
  | TicketStatus
  | "Generado"
  | "Acreditado a saldo"
  | "Retiro solicitado"
  | "Solicitado"
  | "Cancelado"
  | "Reembolsado"
  | "Activa"
  | "Pausada"
  | "Ejecutada"
  | "Cerrada"
  | "No ejecutada — saldo insuficiente";

const pending = "border-status-pending/40 bg-status-pending-soft text-status-pending";
const review = "border-status-review/40 bg-status-review-soft text-status-review";
const success = "border-status-success/40 bg-status-success-soft text-status-success";
const danger = "border-status-danger/40 bg-status-danger-soft text-status-danger";
const expired = "border-status-expired/40 bg-status-expired-soft text-status-expired";
const gold = "border-gold/50 bg-gold-light/40 text-gold-deep";

const styles: Record<AppStatus, string> = {
  "Pendiente": pending,
  "Solicitado": pending,
  "Retiro solicitado": pending,
  "En revisión": review,
  "Aprobado": success,
  "Pagado": success,
  "Acreditado a saldo": success,
  "Reembolsado": success,
  "Activa": success,
  "Ejecutada": success,
  "Rechazado": danger,
  "Anulado": danger,
  "Cancelado": expired,
  "Pausada": review,
  "Cerrada": expired,
  "No ejecutada — saldo insuficiente": danger,
  "Vencido": expired,
  "Ganador": gold,
  "Generado": gold,
};

export function StatusBadge({ status, className }: { status: AppStatus; className?: string }) {
  return <Badge variant="outline" className={cn("gap-1.5 uppercase tracking-[0.12em]", styles[status], className)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</Badge>;
}
