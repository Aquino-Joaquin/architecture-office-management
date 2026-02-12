import { Badge, Card, Progress } from "flowbite-react";
import { LuTarget } from "react-icons/lu";
import { getMilestoneProgress } from "../../helper/getMilestoneProgress";
import type { Milestone } from "../../types/Milestone";
import { useNavigate } from "react-router-dom";
import type { TFunction } from "i18next";
export type Props = {
  milestones: Milestone[];
  t: TFunction;
};
export default function MilestoneCard({ milestones, t }: Props) {
  const navigate = useNavigate();
  function handleMilestone(milestoneId: number) {
    navigate(`milestones/tasks/${milestoneId}`);
  }
  return (
    <Card className="bg-white! border-none shadow-sm shadow-gray-400 h-full">
      <div className="flex items-center gap-2 mb-4">
        <LuTarget className="text-gray-600" />
        <h2 className="text-lg font-semibold">{t("milestones")}</h2>
      </div>
      <div>
        {milestones &&
          milestones.map((milestone) => (
            <Card
              key={milestone.id}
              onClick={() => handleMilestone(milestone.id)}
              className="bg-white! border-none shadow-md shadow-gray-600 mb-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{milestone.title}</h3>
                <Badge color="info">in-progress</Badge>
              </div>

              <p className="text-sm text-gray-500">{milestone.description}</p>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{getMilestoneProgress(milestone)}%</span>
                </div>
                <Progress
                  color="green"
                  progress={getMilestoneProgress(milestone)}
                />
              </div>
            </Card>
          ))}
      </div>
    </Card>
  );
}
