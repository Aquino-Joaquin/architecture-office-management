import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

type TableProps<T> = {
  titles: string[];
  rows: T[];
  renderRow: (item: T) => React.ReactNode;
};

// Agregamos <T,> antes de los props para declarar el genérico
export default function TableComponent<T>({
  titles,
  rows,
  renderRow,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          {titles.map((title, index) => (
            <TableHeadCell key={index}>{title}</TableHeadCell>
          ))}
        </TableHead>

        <TableBody className="divide-y">
          {rows.map((item) => renderRow(item))}
        </TableBody>
      </Table>
    </div>
  );
}
