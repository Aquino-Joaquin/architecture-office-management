import { Badge, TableCell, TableRow } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { getBadgeColor } from "../../helper/getBadgeColor";
import type { Milestone } from "../../types/Milestone";
export type Props = {
  milestone: Milestone;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  canDoActions: boolean;
};
export default function MilestoneRowComponent({
  milestone,
  handleEdit,
  handleDelete,
  canDoActions,
}: Props) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {milestone.title}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        {milestone.description}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900">
        <Badge
          color={getBadgeColor(
            milestone.completed ? "completed" : "incompleted",
          )}
          size="xs"
        >
          {milestone.completed ? "Completed" : "Incompleted"}
        </Badge>
      </TableCell>

      {canDoActions && (
        <TableCell className="whitespace-nowrap font-medium text-gray-900">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleEdit(milestone.id)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <HiPencil className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(milestone.id)}
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
