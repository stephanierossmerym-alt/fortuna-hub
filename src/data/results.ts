export type DrawResult = {
  id: string;
  date: string;
  drawName: string;
  lottery: string;
  time: string;
  winning: { position: number; name: string; number: string }[];
  published: boolean;
};

export const results: DrawResult[] = [
  {
    id: "r-2026-09-12-noche",
    date: "Sábado 12 de Septiembre del 2026",
    drawName: "Noche",
    lottery: "LTT",
    time: "20:00",
    published: true,
    winning: [
      { position: 1, name: "Suerte Víveres", number: "29" },
      { position: 2, name: "Suerte Víveres", number: "47" },
      { position: 3, name: "Suerte Víveres", number: "08" },
      { position: 4, name: "Suerte Víveres", number: "25" },
      { position: 5, name: "Suerte Víveres", number: "61" },
      { position: 6, name: "Suerte Víveres", number: "13" },
      { position: 7, name: "Suerte Víveres", number: "90" },
    ],
  },
  {
    id: "r-2026-09-12-matutina",
    date: "Sábado 12 de Septiembre del 2026",
    drawName: "Matutina",
    lottery: "LTT",
    time: "13:00",
    published: true,
    winning: [
      { position: 1, name: "Suerte Víveres", number: "25" },
      { position: 2, name: "Suerte Víveres", number: "72" },
      { position: 3, name: "Suerte Víveres", number: "04" },
      { position: 4, name: "Suerte Víveres", number: "56" },
      { position: 5, name: "Suerte Víveres", number: "33" },
      { position: 6, name: "Suerte Víveres", number: "18" },
      { position: 7, name: "Suerte Víveres", number: "41" },
    ],
  },
  {
    id: "r-2026-09-11-noche",
    date: "Viernes 11 de Septiembre del 2026",
    drawName: "Noche",
    lottery: "LTT",
    time: "20:00",
    published: true,
    winning: [
      { position: 1, name: "Suerte Víveres", number: "07" },
      { position: 2, name: "Suerte Víveres", number: "88" },
      { position: 3, name: "Suerte Víveres", number: "52" },
      { position: 4, name: "Suerte Víveres", number: "10" },
      { position: 5, name: "Suerte Víveres", number: "37" },
      { position: 6, name: "Suerte Víveres", number: "64" },
      { position: 7, name: "Suerte Víveres", number: "29" },
    ],
  },
];
