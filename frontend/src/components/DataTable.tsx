import React from "react";

interface Column {
  key: string;
  label: string;
  editable?: boolean;
  type?: "select" | "checkbox" | "password" | "text";
  options?: { value: string; label: string }[];
  render?: (row: Record<string, any>, index: number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onChange: (rowIdx: number, key: string, value: any) => void;
  rowClassName?: (row: Record<string, any>, idx: number) => string;
}

export function DataTable({ columns, data, onChange, rowClassName }: DataTableProps) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={rowClassName ? rowClassName(row, i) : ""}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? (
                  col.render(row, i)
                ) : col.editable ? (
                  col.type === "select" ? (
                    <select
                      value={row[col.key] || ""}
                      onChange={(e) => onChange(i, col.key, e.target.value)}
                    >
                      {col.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : col.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(row[col.key])}
                      onChange={(e) => onChange(i, col.key, e.target.checked)}
                    />
                  ) : col.type === "password" ? (
                    <input
                      type="password"
                      value={row[col.key] || ""}
                      onChange={(e) => onChange(i, col.key, e.target.value)}
                    />
                  ) : (
                    <input
                      value={row[col.key] || ""}
                      onChange={(e) => onChange(i, col.key, e.target.value)}
                    />
                  )
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
