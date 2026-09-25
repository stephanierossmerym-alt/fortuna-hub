export type PrizeStatus = "Ganador" | "Pendiente" | "Acreditado a saldo" | "Retiro solicitado" | "Pagado" | "Vencido";

export type Prize = {
  id: string;
  ticketId: string;
  customer: string;
  guest: boolean;
  drawName: string;
  suerte: string;
  number: string;
  amount: number;
  secretCode: string;
  generatedAt: string;
  expiresAt: string;
  status: PrizeStatus;
};

export type WithdrawalStatus = "Solicitado" | "En revisión" | "Aprobado" | "Pagado" | "Rechazado" | "Cancelado";

export type Withdrawal = {
  id: string;
  customer: string;
  amount: number;
  destination: string;
  requestedAt: string;
  status: WithdrawalStatus;
  history: { at: string; status: WithdrawalStatus; by: string }[];
  note?: string | undefined;
};

export const refundCauses = [
  "Pago fuera de horario",
  "Pago duplicado",
  "Error técnico",
  "Cobro no ejecutable",
  "Otra incidencia excepcional autorizada",
] as const;
export type RefundCause = (typeof refundCauses)[number];

export type Refund = {
  id: string;
  reference: string;
  customer: string;
  amount: number;
  cause: RefundCause;
  originalMovement: string;
  status: "Pendiente" | "Reembolsado" | "Rechazado";
  createdAt: string;
  by: string | null;
};

export const maskCode = (_code: string) => "••••-••••";

export const prizes: Prize[] = [
  { id: "PR-701", ticketId: "RF-4591", customer: "Rossmery M.", guest: false, drawName: "Noche 20:00 · Lotto", suerte: "1ª Suerte", number: "29", amount: 360, secretCode: "7F4K-22Q9", generatedAt: "12/09/2026 · 20:12", expiresAt: "20/09/2026", status: "Ganador" },
  { id: "PR-688", ticketId: "RF-4540", customer: "Rossmery M.", guest: false, drawName: "Matutina 13:00 · LTT", suerte: "3ª Suerte", number: "81", amount: 15, secretCode: "2M8C-90AA", generatedAt: "08/09/2026 · 13:10", expiresAt: "16/09/2026", status: "Acreditado a saldo" },
  { id: "PR-640", ticketId: "RF-4502", customer: "Rossmery M.", guest: false, drawName: "Noche 20:00 · Lotería", suerte: "6ª Suerte", number: "07", amount: 6, secretCode: "9Z1L-43PP", generatedAt: "28/08/2026 · 20:09", expiresAt: "05/09/2026", status: "Vencido" },
  { id: "PR-712", ticketId: "RF-4598", customer: "Invitado RF-104", guest: true, drawName: "Noche 20:00 · Lotto", suerte: "2ª Suerte", number: "54", amount: 30, secretCode: "5T3E-11RD", generatedAt: "12/09/2026 · 20:12", expiresAt: "20/09/2026", status: "Pendiente" },
  { id: "PR-695", ticketId: "RF-4551", customer: "Carlos P.", guest: false, drawName: "Matutina 13:00 · LTT", suerte: "1ª Suerte", number: "12", amount: 180, secretCode: "8H6W-70BN", generatedAt: "10/09/2026 · 13:11", expiresAt: "18/09/2026", status: "Pagado" },
  { id: "PR-699", ticketId: "RF-4560", customer: "Lucía V.", guest: false, drawName: "Noche 20:00 · Lotería", suerte: "4ª Suerte", number: "33", amount: 15, secretCode: "4R2Y-58KC", generatedAt: "11/09/2026 · 20:10", expiresAt: "19/09/2026", status: "Retiro solicitado" },
];

export const withdrawals: Withdrawal[] = [
  { id: "RT-310", customer: "Lucía V.", amount: 15, destination: "Banco Pichincha ••• 2231", requestedAt: "12/09/2026 · 09:30", status: "En revisión", history: [{ at: "12/09/2026 · 09:30", status: "Solicitado", by: "Lucía V." }, { at: "12/09/2026 · 10:05", status: "En revisión", by: "Administrador RF-01" }] },
  { id: "RT-302", customer: "Carlos P.", amount: 180, destination: "Produbanco ••• 8810", requestedAt: "10/09/2026 · 14:00", status: "Pagado", history: [{ at: "10/09/2026 · 14:00", status: "Solicitado", by: "Carlos P." }, { at: "10/09/2026 · 15:20", status: "Aprobado", by: "Administrador RF-01" }, { at: "10/09/2026 · 16:45", status: "Pagado", by: "Administrador RF-01" }] },
  { id: "RT-298", customer: "Rossmery M.", amount: 10, destination: "Banco Guayaquil ••• 4187", requestedAt: "05/09/2026 · 11:00", status: "Cancelado", history: [{ at: "05/09/2026 · 11:00", status: "Solicitado", by: "Rossmery M." }, { at: "05/09/2026 · 11:40", status: "Cancelado", by: "Rossmery M." }] },
  { id: "RT-305", customer: "Pedro A.", amount: 40, destination: "Banco Pichincha ••• 0092", requestedAt: "11/09/2026 · 10:10", status: "Rechazado", note: "Cuenta de destino no coincide con el titular", history: [{ at: "11/09/2026 · 10:10", status: "Solicitado", by: "Pedro A." }, { at: "11/09/2026 · 12:00", status: "Rechazado", by: "Administrador RF-01" }] },
];

export const refunds: Refund[] = [
  { id: "RE-120", reference: "RF-4599", customer: "Invitado RF-117", amount: 3, cause: "Pago fuera de horario", originalMovement: "Pago recibido 12/09/2026 · 19:42 (sorteo cerrado 19:30)", status: "Pendiente", createdAt: "12/09/2026 · 19:50", by: null },
  { id: "RE-114", reference: "RC-2049", customer: "Carlos P.", amount: 20, cause: "Pago duplicado", originalMovement: "Recarga RC-2049 · 11/09/2026 · 10:00", status: "Reembolsado", createdAt: "11/09/2026 · 10:30", by: "Administrador RF-01" },
  { id: "RE-109", reference: "RF-4569", customer: "Rossmery M.", amount: 3, cause: "Error técnico", originalMovement: "Uso de saldo MV-9002 · 11/09/2026 · 12:05", status: "Reembolsado", createdAt: "11/09/2026 · 12:40", by: "Administrador RF-01" },
];
