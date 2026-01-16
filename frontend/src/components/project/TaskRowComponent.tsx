import { Badge, TableCell, TableRow } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { getBadgeColor } from "../../helper/getBadgeColor";
import type { Task } from "../../types/Task";
export type Props = {
  task: Task;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  canDoActions: boolean;
};
export default function TaskRowComponent({
  task,
  handleEdit,
  handleDelete,
  canDoActions,
}: Props) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.title}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.description}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <Badge
          color={getBadgeColor(task.completed ? "completed" : "incompleted")}
          size="xs"
        >
          {task.completed ? "Completed" : "Incompleted"}
        </Badge>
      </TableCell>

      {canDoActions && (
        <TableCell className="whitespace-nowrap font-medium text-gray-900">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleEdit(task.id)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <HiPencil className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(task.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <HiTrash className="h-5 w-5" />
            </button>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
