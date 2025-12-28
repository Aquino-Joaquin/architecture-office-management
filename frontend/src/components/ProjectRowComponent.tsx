import { TableCell, TableRow } from "flowbite-react";
import type { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";

export type Props = {
  project: Project;
};

export default function ProjectRowComponent({ project }: Props) {
  const navigate = useNavigate();
  return (
    <TableRow onClick={() => navigate("/projectDetail")}>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.name}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.status}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.totalPrice}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.amoutPaid}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.client.name}
      </TableCell>
    </TableRow>
  );
}
