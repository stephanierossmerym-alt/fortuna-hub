export type CommissionStatus = "Pendiente" | "Aprobado" | "Pagado";
export type ContractStatus = "Activa" | "Cerrada";
export type CreditStatus = "Sin crédito" | "Pendiente" | "Autorizado";

export type VendorSale = {
  id: string;
  ticketId: string;
  draw: string;
  customer: string;
  amount: number;
  collected: number;
  origin: string;
  commissionRate: number;
  commission: number;
  commissionStatus: CommissionStatus;
  soldAt: string;
};

export type ContractLot = {
  id: string;
  draw: string;
  modality: string;
  plan: string;
  unitPrice: number;
  contracted: number;
  sold: number;
  collected: number;
  status: ContractStatus;
  creditStatus: CreditStatus;
  receivable: number;
};

export type VendorProfile = {
  id: string;
  name: string;
  phone: string;
  commissionRate: number;
  active: boolean;
};

export const vendorProfile: VendorProfile = {
  id: "VEN-03",
  name: "Vendedor RF-03",
  phone: "098 ••• 2046",
  commissionRate: 12,
  active: true,
};

export const vendorSales: VendorSale[] = [
  { id: "V-2318", ticketId: "RF-4638", draw: "Noche 20:00", customer: "Cliente RF-208", amount: 5, collected: 5, origin: "Vendedor RF-03", commissionRate: 12, commission: 0.6, commissionStatus: "Aprobado", soldAt: "19:02" },
  { id: "V-2313", ticketId: "RF-4633", draw: "Noche 20:00", customer: "Invitado RF-124", amount: 3, collected: 3, origin: "Vendedor RF-03", commissionRate: 12, commission: 0.36, commissionStatus: "Pendiente", soldAt: "18:41" },
  { id: "V-2304", ticketId: "RF-4624", draw: "Matutina 13:00", customer: "Cliente RF-311", amount: 10, collected: 10, origin: "Vendedor RF-03", commissionRate: 12, commission: 1.2, commissionStatus: "Pagado", soldAt: "11:52" },
  { id: "V-2298", ticketId: "RF-4618", draw: "Matutina 13:00", customer: "Invitado RF-121", amount: 4, collected: 4, origin: "Venta directa Ross Fortuna", commissionRate: 0, commission: 0, commissionStatus: "Pagado", soldAt: "11:26" },
];

export const initialContractLots: ContractLot[] = [
  { id: "CTR-204", draw: "Noche 20:00", modality: "2 cifras", plan: "Plan Clásico v2", unitPrice: 1, contracted: 40, sold: 27, collected: 22, status: "Activa", creditStatus: "Autorizado", receivable: 5 },
  { id: "CTR-207", draw: "Matutina 13:00", modality: "2 cifras", plan: "Plan Fortuna v2", unitPrice: 1, contracted: 20, sold: 8, collected: 8, status: "Activa", creditStatus: "Sin crédito", receivable: 0 },
  { id: "CTR-198", draw: "Noche 20:00", modality: "3 cifras", plan: "Plan Triple v1", unitPrice: 2, contracted: 15, sold: 15, collected: 30, status: "Cerrada", creditStatus: "Sin crédito", receivable: 0 },
];

export const vendors: VendorProfile[] = [
  vendorProfile,
  { id: "VEN-05", name: "Vendedor RF-05", phone: "097 ••• 7731", commissionRate: 10, active: true },
  { id: "VEN-09", name: "Vendedor RF-09", phone: "096 ••• 1914", commissionRate: 8, active: false },
];