export const Status = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
