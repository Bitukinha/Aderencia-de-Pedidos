export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
] as const;

export type MesType = typeof MESES[number];

export const SEGMENTOS = [
  "Suínos",
  "Aves",
  "Bovinos",
  "Aquicultura",
  "Pet",
  "Humano",
  "Outros",
] as const;

export type SegmentoType = typeof SEGMENTOS[number];

export interface DelayedOrder {
  cliente: string;
  produto: string;
  quantidade: string;
  dataPrevista: string;
  dataEntregue: string;
  diasAtraso: number;
  motivo: string;
  mes: MesType;
  ano: number;
  segmento: string;
}

export const delayedOrders: DelayedOrder[] = [
  { cliente: "Vidara", produto: "Nutrigel-Pro", quantidade: "14.000", dataPrevista: "13/jan", dataEntregue: "14/jan", diasAtraso: 1, motivo: "Problemas na extrusora", mes: "Janeiro", ano: 2026, segmento: "Suínos" },
  { cliente: "Tectron", produto: "Nutrigel-Pro", quantidade: "14.000", dataPrevista: "13/jan", dataEntregue: "15/jan", diasAtraso: 2, motivo: "Problemas na extrusora", mes: "Janeiro", ano: 2026, segmento: "Suínos" },
  { cliente: "Suinobras", produto: "Nutrigel-Pro", quantidade: "14.000", dataPrevista: "14/jan", dataEntregue: "15/jan", diasAtraso: 1, motivo: "Problemas na extrusora", mes: "Janeiro", ano: 2026, segmento: "Suínos" },
  { cliente: "Vilomix", produto: "Nutrigel-Pro", quantidade: "14.000", dataPrevista: "27/jan", dataEntregue: "28/jan", diasAtraso: 1, motivo: "Problemas na extrusora", mes: "Janeiro", ano: 2026, segmento: "Aves" },
  { cliente: "Heleng", produto: "Fubá Vitaminado", quantidade: "46.000", dataPrevista: "13/jan", dataEntregue: "14/jan", diasAtraso: 1, motivo: "Milho Sujo/Falta de Milho", mes: "Janeiro", ano: 2026, segmento: "Humano" },
  { cliente: "Master", produto: "Pré Cozido", quantidade: "2.000.000", dataPrevista: "10/jan", dataEntregue: "22/jan", diasAtraso: 12, motivo: "Processo/alta demanda vale/falta de milho", mes: "Janeiro", ano: 2026, segmento: "Humano" },
  { cliente: "Nuttria", produto: "Nutrigel-Pro", quantidade: "16.800", dataPrevista: "09/fev", dataEntregue: "10/fev", diasAtraso: 1, motivo: "Problema nos moinhos", mes: "Fevereiro", ano: 2026, segmento: "Suínos" },
  { cliente: "BRF", produto: "Nutrigel-Pro", quantidade: "32.000", dataPrevista: "09/fev", dataEntregue: "13/fev", diasAtraso: 4, motivo: "Necessidade de expurgar carg do estoque e tirar nova", mes: "Fevereiro", ano: 2026, segmento: "Aves" },
  { cliente: "Furquim", produto: "D48", quantidade: "32.000", dataPrevista: "09/fev", dataEntregue: "10/fev", diasAtraso: 1, motivo: "Problema nos moinhos", mes: "Fevereiro", ano: 2026, segmento: "Bovinos" },
  { cliente: "Vidara", produto: "Nutrigel-Pro", quantidade: "14.000", dataPrevista: "23/fev", dataEntregue: "24/fev", diasAtraso: 1, motivo: "Falta de Milho", mes: "Fevereiro", ano: 2026, segmento: "Suínos" },
  { cliente: "Furquim", produto: "D48", quantidade: "32.000", dataPrevista: "24/fev", dataEntregue: "25/fev", diasAtraso: 1, motivo: "Falta de Milho", mes: "Fevereiro", ano: 2026, segmento: "Bovinos" },
  { cliente: "Mais Doce", produto: "Canjiquinha Fina", quantidade: "24.000", dataPrevista: "16/fev", dataEntregue: "", diasAtraso: 8, motivo: "Milho Sujo/Falta de Milho", mes: "Fevereiro", ano: 2026, segmento: "Humano" },
  { cliente: "Heleng Haiti", produto: "Farinha Média", quantidade: "46.000", dataPrevista: "18/fev", dataEntregue: "", diasAtraso: 6, motivo: "Milho Sujo/Falta de Milho", mes: "Fevereiro", ano: 2026, segmento: "Humano" },
];

