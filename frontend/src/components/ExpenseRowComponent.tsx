import { TableCell, TableRow } from "flowbite-react";
import type { Expense } from "../types/Expense";
import { HiPencil, HiTrash } from "react-icons/hi";
export type Props = {
  expense: Expense;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};
export default function ExpenseRowComponent({
  expense,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.description}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {new Date(expense.createdAt).getDate()}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.type}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.project?.name || "--"}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.amount}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEdit(expense.id)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HiPencil className="h-5 w-5" />
          </button>

          <button
            onClick={() => handleDelete(expense.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
