import { TableCell, TableRow } from "flowbite-react";
import type { User } from "../types/User";

export type Props = {
  user: User;
};
export default function UserRowComponent({ user }: Props) {
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
    </TableRow>
  );
}
