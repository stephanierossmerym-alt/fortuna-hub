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
