import type { TicketStatus } from "@/data/tickets";

export type ReceiptStatus = "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";

export type Receipt = {
  id: string;
  ticketId: string;
  customer: string;
  amount: number;
  method: string;
  createdAt: string;
  uploadedAt: string;
  verifiedTime: string;
  reviewedAt: string | null;
  reviewer: string | null;
  result: string | null;
  status: ReceiptStatus;
  drawClosed: boolean;
  afterResults: boolean;
  origin: string;
  note?: string;
};

export type WorkerSale = {
  id: string;
  ticketId: string;
  customer: string;
  drawName: string;
  number: string;
  value: number;
  soldAt: string;
  status: TicketStatus;
  cancelMinutesLeft: number;
  origin: string;
};

export type AuditEntry = {
  id: string;
  who: string;
  role: string;
  what: string;
  when: string;
  before: string;
  after: string;
  reason: string;
  afterResults?: boolean;
};

export type StaffMember = {
  id: string;
  name: string;
  role: "Administrador" | "Trabajador" | "Vendedor";
  phone: string;
  active: boolean;
  permissions: string[];
};

export const receipts: Receipt[] = [
  {
    id: "CMP-8841",
    ticketId: "RF-4602",
    customer: "Invitado RF-119",
    amount: 3,
    method: "Transferencia bancaria",
    createdAt: "Sábado 12 de Septiembre del 2026 · 19:05:02",
    uploadedAt: "Sábado 12 de Septiembre del 2026 · 19:06:41",
    verifiedTime: "19:06:41",
    reviewedAt: null,
    reviewer: null,
    result: null,
    status: "En revisión",
    drawClosed: false,
    afterResults: false,
    origin: "Venta directa Ross Fortuna",
  },
  {
    id: "CMP-8839",
    ticketId: "RF-4587",
    customer: "Invitado RF-104",
    amount: 3,
    method: "Transferencia bancaria",
    createdAt: "Sábado 12 de Septiembre del 2026 · 18:39:16",
    uploadedAt: "Sábado 12 de Septiembre del 2026 · 18:40:55",
    verifiedTime: "18:40:55",
    reviewedAt: "Sábado 12 de Septiembre del 2026 · 18:52:10",
    reviewer: "Administrador RF-01",
    result: "Aprobado",
    status: "Aprobado",
    drawClosed: false,
    afterResults: false,
    origin: "Venta directa Ross Fortuna",
  },
  {
    id: "CMP-8845",
    ticketId: "RF-4606",
    customer: "Cliente RF-208",
    amount: 5,
    method: "Depósito",
    createdAt: "Sábado 12 de Septiembre del 2026 · 19:58:20",
    uploadedAt: "Sábado 12 de Septiembre del 2026 · 20:03:44",
    verifiedTime: "20:03:44",
    reviewedAt: null,
    reviewer: null,
    result: null,
    status: "Pendiente",
    drawClosed: true,
    afterResults: false,
    origin: "Trabajador RF-07",
    note: "Pago recibido después de la hora de cierre del sorteo.",
  },
  {
    id: "CMP-8832",
    ticketId: "RF-4591",
    customer: "Cliente RF-208",
    amount: 3,
    method: "Transferencia bancaria",
    createdAt: "Sábado 12 de Septiembre del 2026 · 12:44:09",
    uploadedAt: "Sábado 12 de Septiembre del 2026 · 12:45:31",
    verifiedTime: "12:45:31",
    reviewedAt: "Sábado 12 de Septiembre del 2026 · 13:22:48",
    reviewer: "Administrador RF-01",
    result: "Aprobado después de publicar resultados",
    status: "Aprobado",
    drawClosed: true,
    afterResults: true,
    origin: "Venta directa Ross Fortuna",
  },
  {
    id: "CMP-8827",
    ticketId: "RF-4569",
    customer: "Cliente RF-311",
    amount: 2,
    method: "Transferencia bancaria",
    createdAt: "Viernes 11 de Septiembre del 2026 · 19:11:02",
    uploadedAt: "Viernes 11 de Septiembre del 2026 · 19:12:20",
    verifiedTime: "19:12:20",
    reviewedAt: "Viernes 11 de Septiembre del 2026 · 19:31:00",
    reviewer: "Administrador RF-02",
    result: "Rechazado · comprobante ilegible",
    status: "Rechazado",
    drawClosed: false,
    afterResults: false,
    origin: "Trabajador RF-07",
  },
];

export const workerSales: WorkerSale[] = [
  {
    id: "V-2201",
    ticketId: "RF-4602",
    customer: "Invitado RF-119",
    drawName: "Noche 20:00",
    number: "29",
    value: 3,
    soldAt: "19:05",
    status: "En revisión",
    cancelMinutesLeft: 18,
    origin: "Trabajador RF-07",
  },
  {
    id: "V-2199",
    ticketId: "RF-4598",
    customer: "Cliente RF-208",
    drawName: "Noche 20:00",
    number: "74",
    value: 5,
    soldAt: "18:47",
    status: "Aprobado",
    cancelMinutesLeft: 6,
    origin: "Trabajador RF-07",
  },
  {
    id: "V-2194",
    ticketId: "RF-4569",
    customer: "Cliente RF-311",
    drawName: "Noche 20:00",
    number: "08",
    value: 2,
    soldAt: "18:02",
    status: "Anulado",
    cancelMinutesLeft: 0,
    origin: "Trabajador RF-07",
  },
  {
    id: "V-2188",
    ticketId: "RF-4552",
    customer: "Invitado RF-101",
    drawName: "Matutina 13:00",
    number: "41",
    value: 3,
    soldAt: "12:14",
    status: "Aprobado",
    cancelMinutesLeft: 0,
    origin: "Venta directa Ross Fortuna",
  },
];

export const auditTrail: AuditEntry[] = [
  {
    id: "A-5512",
    who: "Administrador RF-01",
    role: "Administrador",
    what: "Comprobante CMP-8839",
    when: "12/09/2026 · 18:52:10",
    before: "En revisión",
    after: "Aprobado",
    reason: "Pago verificado en el estado de cuenta.",
  },
  {
    id: "A-5518",
    who: "Administrador RF-01",
    role: "Administrador",
    what: "Comprobante CMP-8832",
    when: "12/09/2026 · 13:22:48",
    before: "En revisión",
    after: "Aprobado",
    reason: "Pago confirmado con retraso de la entidad bancaria.",
    afterResults: true,
  },
  {
    id: "A-5520",
    who: "Trabajador RF-07",
    role: "Trabajador",
    what: "Venta V-2194 · Ticket RF-4569",
    when: "11/09/2026 · 18:21:35",
    before: "Aprobado",
    after: "Anulado",
    reason: "Cliente entregó un número equivocado dentro del horario permitido.",
  },
  {
    id: "A-5524",
    who: "Administrador RF-02",
    role: "Administrador",
    what: "Plan Clásico",
    when: "10/09/2026 · 09:12:02",
    before: "v1 · 55 por cada $1",
    after: "v2 · 60 por cada $1",
    reason: "Actualización del plan de premios por suerte.",
  },
  {
    id: "A-5530",
    who: "Administrador RF-01",
    role: "Administrador",
    what: "Resultado r-2026-09-12-noche",
    when: "12/09/2026 · 20:18:40",
    before: "Sin publicar",
    after: "Publicado",
    reason: "Publicación oficial del resultado del sorteo.",
  },
];

export const staff: StaffMember[] = [
  { id: "RF-01", name: "Administrador RF-01", role: "Administrador", phone: "099 ••• 1120", active: true, permissions: ["Verificar comprobantes", "Anular ventas", "Publicar resultados", "Editar planes"] },
  { id: "RF-02", name: "Administrador RF-02", role: "Administrador", phone: "098 ••• 7744", active: true, permissions: ["Verificar comprobantes", "Editar planes"] },
  { id: "RF-07", name: "Trabajador RF-07", role: "Trabajador", phone: "096 ••• 3391", active: true, permissions: ["Registrar ventas", "Anular ventas propias en horario"] },
  { id: "RF-12", name: "Trabajador RF-12", role: "Trabajador", phone: "097 ••• 5028", active: false, permissions: ["Registrar ventas"] },
];

export const workerShift = {
  worker: "Trabajador RF-07",
  shift: "Turno Noche · 16:00 a 21:00",
  sold: 38,
  collected: 112,
  pending: 8,
  cancelWindowMinutes: 20,
};
