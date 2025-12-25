import { TableCell } from "flowbite-react";
import type { Projects } from "../types/Projects";

export type Props = {
  project: Projects;
};

export default function ProjectRowComponent({ project }: Props) {
  return (
    <>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.title}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.client}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.price}
      </TableCell>
    </>
  );
}
