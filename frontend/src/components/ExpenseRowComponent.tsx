import { TableCell, TableRow } from "flowbite-react";
import type { Expense } from "../types/Expense";
export type Props = {
  expense: Expense;
};
export default function ExpenseRowComponent({ expense }: Props) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.description}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {expense.createdAt.getDate()}
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
    </TableRow>
  );
}
