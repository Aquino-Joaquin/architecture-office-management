import type { Milestone } from "../types/Milestone";

export function getMilestoneProgress(milestone: Milestone) {
  if (!milestone.tasks.length) return 0;

  const completed = milestone.tasks.filter((t) => t.completed).length;
  return Math.round(Math.min((completed / milestone.tasks.length) * 100, 100));
}
