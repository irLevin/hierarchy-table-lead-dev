export interface TableRow {
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] } | undefined>;
}

export interface TransformedTableRow {
  data: Record<string, string>;
  kids: Record<string, any>;
  open: boolean;
}
