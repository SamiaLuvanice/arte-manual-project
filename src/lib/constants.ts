export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { number: 500, suffix: "+", label: "Peças criadas" },
  { number: 200, suffix: "+", label: "Clientes felizes" },
  { number: 5, suffix: "", label: "Anos de dedicação" },
];
