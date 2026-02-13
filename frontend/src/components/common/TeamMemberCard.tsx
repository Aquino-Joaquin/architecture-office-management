import { Card } from "flowbite-react";
import type { Project } from "../../types/Project";
import type { TFunction } from "i18next";
export type Props = {
  project: Project;
  t: TFunction;
};
export default function TeamMemberCard({ project, t }: Props) {
  return (
    <Card className="bg-white! border-none shadow-sm shadow-gray-400 h-full">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-gray-900">{t("teamMember")}</h3>
      </div>

      <div className="grow flex flex-col gap-4 mt-2">
        {project?.users &&
          project?.users.map((member) => (
            <div
              key={member.id}
              className=" flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                {member.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
}
