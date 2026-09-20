import type { Ticket } from "./tickets";
import { ticketVariants } from "./tickets";

export type CustomerAccount = {
  name: string;
  phone: string;
  balance: number;
  reserved: number;
  tickets: Ticket[];
};

export const customerAccount: CustomerAccount = {
  name: "Rossmery M.",
  phone: "099 ••• 4187",
  balance: 25,
  reserved: 0,
  tickets: ticketVariants,
};

export type GuestLookup = {
  code: string;
  phoneLast4: string;
  verificationCode: string;
  ticketId: string;
};

export const guestLookups: GuestLookup[] = [
  { code: "RF-4587", phoneLast4: "4187", verificationCode: "204815", ticketId: "RF-4587" },
  { code: "9683513149", phoneLast4: "4187", verificationCode: "204815", ticketId: "RF-4587" },
];
