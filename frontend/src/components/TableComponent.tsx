import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import type { Projects } from "../types/Projects";
import ProjectRowComponent from "./ProjectRowComponent";

type TableProps = {
  titles: string[];
  rows: Projects[];
};
export default function TableComponent({ titles, rows }: TableProps) {
  return (
    <div>
      <Table hoverable>
        <TableHead>
          {" "}
          {titles.map((i, index) => (
            <TableHeadCell key={index}>{i}</TableHeadCell>
          ))}
        </TableHead>

        <TableBody className="divide-y">
          {rows.map((i, index) => (
            <TableRow key={index} className="bg-white  ">
              <ProjectRowComponent key={index} project={i} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
