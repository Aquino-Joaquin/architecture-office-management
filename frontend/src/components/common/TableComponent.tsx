import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import Search from "./Search";

type TableProps<T> = {
  titles: string[];
  rows: T[];
  searchPlaceHolder: string;
  renderRow: (item: T) => React.ReactNode;
  filterFn?: (item: T, search: string) => boolean;
};

export default function TableComponent<T>({
  titles,
  rows,
  searchPlaceHolder,
  renderRow,
  filterFn,
}: TableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredRows = filterFn
    ? rows.filter((row) => filterFn(row, search))
    : rows;
  return (
    <div className="overflow-x-auto flex flex-col">
      {filterFn && (
        <Search
          search={search}
          setSearch={setSearch}
          placeHolder={searchPlaceHolder}
        />
      )}
      <Table hoverable>
        <TableHead>
          <TableRow>
            {titles.map((title, index) => (
              <TableHeadCell key={index}>{title}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className="divide-y divide-gray-300">
          {filteredRows.map((item) => renderRow(item))}
        </TableBody>
      </Table>
    </div>
  );
}
