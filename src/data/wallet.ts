export type TopUpStatus = "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";

export type TopUp = {
  id: string;
  customer: string;
  amount: number;
  method: string;
  createdAt: string;
  uploadedAt: string | null;
  verifiedPaymentTime: string | null;
  reviewer: string | null;
  reviewedAt: string | null;
  status: TopUpStatus;
  note?: string | undefined;
};

export type MovementKind = "Dinero recibido" | "Uso de saldo" | "Premio acreditado" | "Reembolso" | "Retiro";

export type Movement = {
  id: string;
  date: string;
  kind: MovementKind;
  concept: string;
  reference: string;
  amount: number; // positivo entra, negativo sale
  before: number;
  after: number;
  by: string;
};

export const LOW_BALANCE_ALERT = 20;

export const topUps: TopUp[] = [
  { id: "RC-2031", customer: "Rossmery M.", amount: 20, method: "Transferencia Banco Pichincha", createdAt: "10/09/2026 · 09:12", uploadedAt: "10/09/2026 · 09:15", verifiedPaymentTime: "10/09/2026 · 09:10", reviewer: "Administrador RF-01", reviewedAt: "10/09/2026 · 10:02", status: "Aprobado" },
  { id: "RC-2044", customer: "Rossmery M.", amount: 15, method: "Transferencia Produbanco", createdAt: "11/09/2026 · 17:40", uploadedAt: "11/09/2026 · 17:44", verifiedPaymentTime: null, reviewer: "Administrador RF-01", reviewedAt: "11/09/2026 · 18:20", status: "Rechazado", note: "Comprobante ilegible" },
  { id: "RC-2052", customer: "Rossmery M.", amount: 10, method: "Transferencia Banco Guayaquil", createdAt: "12/09/2026 · 16:05", uploadedAt: "12/09/2026 · 16:07", verifiedPaymentTime: null, reviewer: null, reviewedAt: null, status: "En revisión" },
  { id: "RC-2058", customer: "Carlos P.", amount: 30, method: "Transferencia Banco Pichincha", createdAt: "12/09/2026 · 18:10", uploadedAt: null, verifiedPaymentTime: null, reviewer: null, reviewedAt: null, status: "Pendiente" },
  { id: "RC-2060", customer: "Lucía V.", amount: 25, method: "Transferencia Produbanco", createdAt: "12/09/2026 · 18:22", uploadedAt: "12/09/2026 · 18:25", verifiedPaymentTime: null, reviewer: null, reviewedAt: null, status: "En revisión" },
];

export const movements: Movement[] = [
  { id: "MV-9001", date: "10/09/2026 · 10:02", kind: "Dinero recibido", concept: "Recarga aprobada", reference: "RC-2031", amount: 20, before: 11, after: 31, by: "Administrador RF-01" },
  { id: "MV-9002", date: "11/09/2026 · 12:05", kind: "Uso de saldo", concept: "Compra ticket Matutina", reference: "RF-4569", amount: -3, before: 31, after: 28, by: "Rossmery M." },
  { id: "MV-9003", date: "11/09/2026 · 12:40", kind: "Reembolso", concept: "Reembolso por ticket anulado", reference: "RF-4569", amount: 3, before: 28, after: 31, by: "Administrador RF-01" },
  { id: "MV-9004", date: "12/09/2026 · 18:39", kind: "Uso de saldo", concept: "Compra ticket Noche", reference: "RF-4591", amount: -6, before: 31, after: 25, by: "Rossmery M." },
];
