import { TableCell, TableRow } from "flowbite-react";
import type { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";

export type Props = {
  project: Project;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function ProjectRowComponent({
  project,
  handleDelete,
  handleEdit,
}: Props) {
  const navigate = useNavigate();
  return (
    <TableRow onClick={() => navigate(`/projectDetail/${project.id}`)}>
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
        {project.amountPaid}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {project.client.name}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(project.id);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HiPencil className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(project.id);
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
