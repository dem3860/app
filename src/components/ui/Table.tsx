// components/ui/Table.tsx

import React from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
};

export function Table<T>({ data, columns, keyField }: TableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-xl shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-2 text-${col.align ?? "left"}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[keyField])}
              className="hover:bg-gray-50 border-t border-gray-200"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-2 text-${col.align ?? "left"}`}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
