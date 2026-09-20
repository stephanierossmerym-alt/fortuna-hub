import { Badge } from "@/components/ui/badge";
import type { TicketStatus } from "@/data/tickets";
import { cn } from "@/lib/utils";

const styles: Record<TicketStatus, string> = {
  "Pendiente": "border-status-pending/40 bg-status-pending-soft text-status-pending",
  "En revisión": "border-status-review/40 bg-status-review-soft text-status-review",
  "Aprobado": "border-status-success/40 bg-status-success-soft text-status-success",
  "Rechazado": "border-status-danger/40 bg-status-danger-soft text-status-danger",
  "Vencido": "border-status-expired/40 bg-status-expired-soft text-status-expired",
  "Pagado": "border-status-success/40 bg-status-success-soft text-status-success",
  "Anulado": "border-status-danger/40 bg-status-danger-soft text-status-danger",
  "Ganador": "border-gold/50 bg-gold-light/40 text-gold-deep",
};

export function StatusBadge({ status, className }: { status: TicketStatus; className?: string }) {
  return <Badge variant="outline" className={cn("gap-1.5 uppercase tracking-[0.12em]", styles[status], className)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</Badge>;
}
