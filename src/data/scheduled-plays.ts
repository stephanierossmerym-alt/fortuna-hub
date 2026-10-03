export type ScheduledPlayStatus = "Activa" | "Pausada" | "Cancelada" | "Ejecutada" | "No ejecutada — saldo insuficiente";

export type ScheduledPlayHistory = {
  id: string;
  when: string;
  change: string;
  detail: string;
};

export type ScheduledPlay = {
  id: string;
  draw: "Matutina 13:00" | "Noche 20:00";
  days: string;
  number: string;
  modality: string;
  plan: string;
  amount: number;
  nextRun: string;
  status: ScheduledPlayStatus;
  history: ScheduledPlayHistory[];
};

export const LOW_BALANCE_ALERT = 20;

export const initialScheduledPlays: ScheduledPlay[] = [
  {
    id: "JP-104",
    draw: "Noche 20:00",
    days: "Martes, jueves y sábado",
    number: "29",
    modality: "2 cifras",
    plan: "Plan Clásico v2",
    amount: 3,
    nextRun: "Martes 15 de Septiembre · 19:30",
    status: "Activa",
    history: [
      { id: "H-401", when: "10/09/2026 · 09:14", change: "Creada", detail: "Programación activa para martes, jueves y sábado." },
      { id: "H-406", when: "12/09/2026 · 19:30", change: "Ejecutada", detail: "Ticket RF-4587 generado y $3.00 descontados del saldo." },
    ],
  },
  {
    id: "JP-102",
    draw: "Matutina 13:00",
    days: "Lunes a sábado",
    number: "74",
    modality: "2 cifras",
    plan: "Plan Fortuna v2",
    amount: 5,
    nextRun: "Pausada por el cliente",
    status: "Pausada",
    history: [{ id: "H-395", when: "11/09/2026 · 20:04", change: "Pausada", detail: "Pausa solicitada por Rossmery M." }],
  },
  {
    id: "JP-099",
    draw: "Noche 20:00",
    days: "Viernes",
    number: "381",
    modality: "3 cifras",
    plan: "Plan Triple v1",
    amount: 30,
    nextRun: "Viernes 11 de Septiembre · 19:30",
    status: "No ejecutada — saldo insuficiente",
    history: [{ id: "H-388", when: "11/09/2026 · 19:30", change: "No ejecutada", detail: "Saldo disponible $25.00; importe requerido $30.00. Sin ticket, sin venta y sin descuento." }],
  },
  {
    id: "JP-091",
    draw: "Matutina 13:00",
    days: "Sábado",
    number: "08",
    modality: "2 cifras",
    plan: "Plan Clásico v2",
    amount: 2,
    nextRun: "Finalizada",
    status: "Ejecutada",
    history: [{ id: "H-371", when: "05/09/2026 · 12:30", change: "Ejecutada", detail: "Ticket RF-4498 generado y $2.00 descontados del saldo." }],
  },
  {
    id: "JP-087",
    draw: "Noche 20:00",
    days: "Domingo",
    number: "16",
    modality: "2 cifras",
    plan: "Plan Clásico v2",
    amount: 1,
    nextRun: "Cancelada",
    status: "Cancelada",
    history: [{ id: "H-362", when: "02/09/2026 · 10:17", change: "Cancelada", detail: "Cancelada por Rossmery M.; no se generarán nuevos tickets." }],
  },
];