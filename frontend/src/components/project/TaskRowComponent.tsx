import { Badge, TableCell, TableRow } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { getBadgeColor } from "../../helper/getBadgeColor";
import type { Task } from "../../types/Task";
import { useTranslation } from "react-i18next";
export type Props = {
  task: Task;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDoubleClick: (id: number) => void;
  canDoActions: boolean;
};
export default function TaskRowComponent({
  task,
  handleEdit,
  handleDelete,
  handleDoubleClick,
  canDoActions,
}: Props) {
  const { t } = useTranslation("task");
  return (
    <TableRow onDoubleClick={() => handleDoubleClick(task.id)}>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.title}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.description}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {task.users.length > 0
          ? task.users.map((user) => user.name).join(", ")
          : "----------"}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <Badge
          color={getBadgeColor(task.completed ? "completed" : "incompleted")}
          size="xs"
        >
          {task.completed ? t("completed") : t("incompleted")}
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
