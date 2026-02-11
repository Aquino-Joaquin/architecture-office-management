import { Badge, Card } from "flowbite-react";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import Header from "./common/Header";
import { getBadgeColor } from "../helper/getBadgeColor";
import type { Task } from "../types/Task";
import { useTranslation } from "react-i18next";
import { FiCheckSquare, FiUser } from "react-icons/fi";
import InformationGrid from "./common/InformationGrid";

type StaffDashboardProps = {
  itemsInformation: CardInfomation[];
  itemsProjects: Project[];
  itemsTasks: Task[];
};

export default function StaffDashboard({
  itemsInformation,
  itemsProjects,
  itemsTasks,
}: StaffDashboardProps) {
  const { t } = useTranslation(["staffDashboard", "badgeStatus"]);

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header title={t("headerTitle")} subTitle={t("headerSubtitle")} />

      <InformationGrid information={itemsInformation} columnNo={3} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  w-full">
        <Card className="w-full shadow-sm shadow-gray-400 bg-white! border-none flex flex-col h-full ">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black ">
              {t("recentProjects")}
            </h5>
          </div>
          <div className="grow -mx-6">
            <ul className="divide-y divide-gray-200">
              <hr className="border-gray-300" />

              {itemsProjects.map(({ id, name, status, totalPrice, client }) => (
                <li
                  key={id}
                  className="px-4 py-3 transition-all hover:bg-gray-50 hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-black">
                        {name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <FiUser className="text-gray-400 text-xs" />
                        <span className="text-sm text-gray-500">
                          {client.name}
                        </span>

                        <Badge color={getBadgeColor(status)} size="xs">
                          {t(`badgeStatus:${status}`)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-gray-900">
                        {totalPrice.toLocaleString("es-PY")} Gs
                      </span>
                      <span className="text-xs text-gray-400">total</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full shadow-sm shadow-gray-400 bg-white! border-none">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black">
              {t("tasks")}
            </h5>
          </div>

          <div className="grow -mx-6">
            <ul className="divide-y divide-gray-200">
              <hr className="border-gray-300" />
              {itemsTasks.map(({ id, title, description, milestone }) => (
                <li
                  key={id}
                  className="px-4 py-3 transition-all hover:bg-gray-50 hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <FiCheckSquare className="mt-1 text-gray-400" />

                      <div>
                        <p className="truncate text-sm font-medium text-black">
                          {title}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {description}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {milestone.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
