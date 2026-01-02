import { TableCell, TableRow } from "flowbite-react";
import type { User } from "../types/User";
import { HiPencil, HiTrash } from "react-icons/hi";

export type Props = {
  user: User;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};
export default function UserRowComponent({
  user,
  handleDelete,
  handleEdit,
}: Props) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {user.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {user.name}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {user.email}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {user.role}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {user.projects?.length || "--"}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEdit(user.id)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HiPencil className="h-5 w-5" />
          </button>

          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
