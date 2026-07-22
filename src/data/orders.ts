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
  numero: string;
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

export const delayedOrders: DelayedOrder[] = [];

