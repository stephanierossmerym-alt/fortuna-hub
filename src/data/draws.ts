export type Modality = {
  id: string;
  label: string;
  digits: number;
  active: boolean;
};

export type PlanPrize = {
  position: number;
  name: string;
  perDollar: number;
};

export type Plan = {
  id: string;
  name: string;
  version: string;
  modalityId: string;
  prizes: PlanPrize[];
};

export type Draw = {
  id: string;
  name: string;
  time: string;
  lottery: string;
  closesAt: string;
  days: string;
  note: string;
  open: boolean;
};

export const modalities: Modality[] = [
  { id: "m2", label: "2 cifras", digits: 2, active: true },
  { id: "m3", label: "3 cifras", digits: 3, active: true },
  { id: "m4", label: "4 cifras", digits: 4, active: true },
];

const suerte = (perDollar: number[], name = "Suerte Víveres"): PlanPrize[] =>
  perDollar.map((value, index) => ({ position: index + 1, name, perDollar: value }));

export const plans: Plan[] = [
  { id: "p-clasico", name: "Plan Clásico", version: "v2", modalityId: "m2", prizes: suerte([60, 10, 5, 5, 5, 2, 1]) },
  { id: "p-fortuna", name: "Plan Fortuna", version: "v2", modalityId: "m2", prizes: suerte([50, 25, 20, 20, 10, 5, 2]) },
  { id: "p-triple", name: "Plan Triple", version: "v1", modalityId: "m3", prizes: suerte([300, 60, 30, 20, 15, 10, 8, 6, 4, 2]) },
  { id: "p-maximo", name: "Plan Máximo", version: "v1", modalityId: "m4", prizes: suerte([900, 200, 90, 50, 30, 20, 12, 8, 5, 3]) },
];

export const draws: Draw[] = [
  {
    id: "matutina",
    name: "Matutina",
    time: "13:00",
    lottery: "LTT",
    closesAt: "12:30",
    days: "Lunes a sábado",
    note: "El equivalente en electrodomésticos y víveres",
    open: true,
  },
  {
    id: "noche",
    name: "Noche",
    time: "20:00",
    lottery: "LTT",
    closesAt: "19:30",
    days: "Lunes a sábado",
    note: "El equivalente en electrodomésticos y víveres",
    open: true,
  },
];

export const nightLotteryByDay = [
  { day: "Lunes", lottery: "Lotería" },
  { day: "Martes", lottery: "Lotto" },
  { day: "Miércoles", lottery: "Lotería" },
  { day: "Jueves", lottery: "Lotto" },
  { day: "Viernes", lottery: "Lotería" },
  { day: "Sábado", lottery: "Lotto" },
  { day: "Domingo", lottery: "Sin definir" },
];

export function plansForModality(modalityId: string) {
  return plans.filter((plan) => plan.modalityId === modalityId);
}
