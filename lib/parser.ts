import Papa from "papaparse";

export function parseCSV(csv: string) {
  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}
