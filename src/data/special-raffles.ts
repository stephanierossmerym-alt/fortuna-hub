export type RafflePackage = {
  id: string;
  label: string;
  price: number;
  chances: number;
};

export type SpecialRaffle = {
  id: string;
  name: string;
  prize: string;
  description: string;
  price: number;
  sold: number;
  total: number;
  closing: string;
  packages: RafflePackage[];
  tone: "gold" | "cream" | "sand";
};

export type SpecialPurchaseStatus = "Pago pendiente" | "En revisión" | "Aprobado" | "Rechazado";

export type SpecialPurchase = {
  id: string;
  raffleId: string;
  raffleName: string;
  customer: string;
  phone: string;
  packageLabel: string;
  chances: number;
  total: number;
  receipt: string;
  status: SpecialPurchaseStatus;
  createdAt: string;
  verifiedAt?: string;
  reviewer?: string;
  numbers: string[];
};

export type FortuneNumber = {
  id: string;
  number: string;
  prize: number;
  active: boolean;
  createdAt: string;
};

export const specialRaffles: SpecialRaffle[] = [
  {
    id: "moto",
    name: "Rifa de Moto",
    prize: "Moto 0 km + casco",
    description: "Números de 5 cifras. El ganador se determina con la lotería de referencia del día de cierre.",
    price: 1,
    sold: 750,
    total: 1000,
    closing: "Cierra al venderse por completo",
    packages: [
      { id: "moto-1", label: "1 oportunidad", price: 1, chances: 1 },
      { id: "moto-5", label: "5 oportunidades", price: 1, chances: 5 },
      { id: "moto-10", label: "10 oportunidades", price: 10, chances: 10 },
    ],
    tone: "gold",
  },
  {
    id: "canasta",
    name: "Canasta Fortuna",
    prize: "Canasta de víveres y electrodomésticos",
    description: "Ideal para el hogar. Incluye premios instantáneos por Números Fortuna.",
    price: 2,
    sold: 320,
    total: 1000,
    closing: "Cierra por fecha",
    packages: [
      { id: "canasta-1", label: "1 oportunidad", price: 2, chances: 1 },
      { id: "canasta-3", label: "3 oportunidades", price: 5, chances: 3 },
    ],
    tone: "cream",
  },
  {
    id: "efectivo",
    name: "Efectivo $1.000",
    prize: "$1.000 en efectivo",
    description: "Premio principal en efectivo acreditable a tu saldo Ross Fortuna.",
    price: 1,
    sold: 900,
    total: 1000,
    closing: "Cierre manual",
    packages: [
      { id: "efectivo-1", label: "1 oportunidad", price: 1, chances: 1 },
      { id: "efectivo-10", label: "10 oportunidades", price: 8, chances: 10 },
    ],
    tone: "sand",
  },
];

export const initialSpecialPurchases: SpecialPurchase[] = [
  {
    id: "RF-4589",
    raffleId: "moto",
    raffleName: "Rifa de Moto",
    customer: "Invitado RF-104",
    phone: "099 ••• 4821",
    packageLabel: "10 oportunidades",
    chances: 10,
    total: 10,
    receipt: "comprobante-rf4589.jpg",
    status: "Pago pendiente",
    createdAt: "Sábado 12 de Septiembre del 2026 · 18:42:09",
    numbers: [],
  },
  {
    id: "RF-4577",
    raffleId: "canasta",
    raffleName: "Canasta Fortuna",
    customer: "Rossmery M.",
    phone: "098 ••• 7714",
    packageLabel: "3 oportunidades",
    chances: 3,
    total: 5,
    receipt: "comprobante-rf4577.jpg",
    status: "Aprobado",
    createdAt: "Viernes 11 de Septiembre del 2026 · 16:12:33",
    verifiedAt: "Viernes 11 de Septiembre del 2026 · 16:21:08",
    reviewer: "Administrador RF-01",
    numbers: ["18472", "62091", "73905"],
  },
];

export const initialFortuneNumbers: FortuneNumber[] = [
  { id: "NF-02746", number: "02746", prize: 100, active: true, createdAt: "01/09/2026 · 09:00" },
  { id: "NF-34872", number: "34872", prize: 500, active: true, createdAt: "01/09/2026 · 09:04" },
];
