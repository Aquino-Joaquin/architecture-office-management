import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

type TableProps<T> = {
  titles: string[];
  rows: T[];
  renderRow: (item: T) => React.ReactNode;
};

export default function TableComponent<T>({
  titles,
  rows,
  renderRow,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            {titles.map((title, index) => (
              <TableHeadCell key={index}>{title}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className="divide-y divide-gray-300">
          {rows.map((item) => renderRow(item))}
        </TableBody>
      </Table>
    </div>
  );
}
