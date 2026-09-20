export type TicketStatus =
  | "Pendiente"
  | "En revisión"
  | "Aprobado"
  | "Rechazado"
  | "Vencido"
  | "Pagado"
  | "Anulado"
  | "Ganador";

export type TicketPrize = {
  position: number;
  name: string;
  amount: number;
};

export type Ticket = {
  id: string;
  drawName: string;
  drawDate: string;
  drawTime: string;
  lottery: string;
  number: string;
  code: string;
  value: number;
  purchaseDate: string;
  expiresInDays: number;
  note: string;
  modality: string;
  plan: string;
  planVersion: string;
  status: TicketStatus;
  customer: string;
  origin: string;
  seller?: string;
  prizes: TicketPrize[];
};

export const primaryTicket: Ticket = {
  id: "RF-4587",
  drawName: "Noche",
  drawDate: "Sábado 12 de Septiembre del 2026",
  drawTime: "20:00",
  lottery: "LTT",
  number: "29",
  code: "9683513149",
  value: 3,
  purchaseDate: "Sábado 12 de Septiembre del 2026 · 18:39:16",
  expiresInDays: 8,
  note: "El equivalente en electrodomésticos y víveres",
  modality: "2 cifras",
  plan: "Plan Clásico",
  planVersion: "v2",
  status: "Aprobado",
  customer: "Invitado RF-104",
  origin: "Venta directa Ross Fortuna",
  prizes: [180, 30, 15, 15, 15, 6, 3].map((amount, index) => ({
    position: index + 1,
    name: "Suerte Víveres",
    amount,
  })),
};

export const ticketVariants: Ticket[] = [
  primaryTicket,
  { ...primaryTicket, id: "RF-4591", number: "25", drawName: "Matutina", drawTime: "13:00", status: "Ganador", customer: "Cliente RF-208" },
  { ...primaryTicket, id: "RF-4569", number: "08", status: "Anulado", origin: "Trabajador", seller: "Operador RF-07" },
  { ...primaryTicket, id: "RF-4502", number: "71", status: "Vencido", plan: "Plan Fortuna", planVersion: "v1" },
];
