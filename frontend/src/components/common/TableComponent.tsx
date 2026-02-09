import {
  Button,
  ButtonGroup,
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
  searchPlaceHolder?: string;
  renderRow: (item: T) => React.ReactNode;
  filterFn?: (
    item: T,
    search: string,
    activeTab: string,
    selectedMonth?: string,
  ) => boolean;
  tabs?: string[];
  enableMonthFilter?: boolean;
};

export default function TableComponent<T>({
  titles,
  rows,
  searchPlaceHolder,
  renderRow,
  filterFn,
  tabs = [],
  enableMonthFilter,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0] || "All");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const filteredRows = filterFn
    ? rows.filter((row) => filterFn(row, search, activeTab, selectedMonth))
    : rows;
  return (
    <div className="overflow-x-auto flex flex-col gap-3">
      {(filterFn || tabs.length > 0) && (
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            {filterFn && (
              <Search
                search={search}
                setSearch={setSearch}
                placeHolder={searchPlaceHolder || ""}
              />
            )}
          </div>
          {enableMonthFilter && (
            <div className="flex items-center gap-2">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {tabs.length > 0 && (
            <ButtonGroup className="mr-10">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <Button
                    key={tab}
                    color={isActive ? "blue" : "gray"}
                    onClick={() => setActiveTab(tab)}
                    className={`border-none focus:ring-0 ${
                      isActive
                        ? "bg-blue-600 shadow-md shadow-gray-500 text-white"
                        : "bg-transparent! text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </Button>
                );
              })}
            </ButtonGroup>
          )}
        </div>
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
