export const Status = {
  PLANNING: "Planning",
  IN_PROGRESS: "InProgress",
  COMPLETED: "Completed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
