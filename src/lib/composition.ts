export interface CompositionRow {
  labelKey: string;
  value: number;
  unit: string;
}

/**
 * Mineral composition per the accredited Aqua Labor (Hungary) lab analysis,
 * as published on amulet.ro/apa-alcalina.html. pH here is the lab-measured
 * value; the branded headline figure "pH 8,2 ±0,5" (printed on bottles)
 * covers this reading. Values are plain numbers so each locale can format
 * the decimal separator correctly (8.38 in English, 8,38 in Romanian/Hungarian).
 */
export const compositionRows: CompositionRow[] = [
  { labelKey: "phLabel", value: 8.38, unit: "" },
  { labelKey: "residueLabel", value: 251, unit: "mg/L" },
  { labelKey: "bicarbonateLabel", value: 159, unit: "mg/L" },
  { labelKey: "sodiumLabel", value: 67.5, unit: "mg/L" },
  { labelKey: "calciumLabel", value: 10.2, unit: "mg/L" },
  { labelKey: "magnesiumLabel", value: 2.6, unit: "mg/L" },
  { labelKey: "totalLabel", value: 330, unit: "mg/L" },
];
