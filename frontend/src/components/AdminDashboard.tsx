import { Badge, Card } from "flowbite-react";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import type { Expense } from "../types/Expense";
import Header from "./common/Header";
import { formatDateDMY } from "../helper/formatDateDMY";
import { getBadgeColor } from "../helper/getBadgeColor";
import { useTranslation } from "react-i18next";
import { FiCalendar, FiUser } from "react-icons/fi";
import InformationGrid from "./common/InformationGrid";
type AdminDashboardProps = {
  itemsInformation: CardInfomation[];
  itemsProjects: Project[];
  itemsExpenses: Expense[];
};

export default function AdminDashboard({
  itemsInformation,
  itemsProjects,
  itemsExpenses,
}: AdminDashboardProps) {
  const { t } = useTranslation(["adminDashboard", "badgeStatus"]);
  const recentProjects = itemsProjects.slice(-5).reverse();
  const recentExpense = itemsExpenses.slice(-5).reverse();

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header title={t("headerTitle")} subTitle={t("headerSubtitle")} />

      <InformationGrid information={itemsInformation} columnNo={4} />

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

              {recentProjects.map(
                ({ id, name, status, totalPrice, client }) => (
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
                ),
              )}
            </ul>
          </div>
        </Card>

        <Card className="w-full shadow-sm shadow-gray-400 bg-white! border-none flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black">
              {t("recentExpenses")}
            </h5>
          </div>

          <div className="grow -mx-6">
            <ul className="divide-y divide-gray-200">
              <hr className="border-gray-300" />

              {recentExpense.map(
                ({ id, description, amount, createdAt, expenseType }) => (
                  <li
                    key={id}
                    className="px-4 py-3 transition-all hover:bg-gray-50 hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-black">
                            {description}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <FiCalendar className="text-gray-400 text-xs" />
                            <span className="text-sm text-gray-500">
                              {formatDateDMY(createdAt)}
                            </span>

                            <Badge
                              color={getBadgeColor(expenseType.name)}
                              size="xs"
                            >
                              {t(`badgeStatus:${expenseType.name}`)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-900">
                          {amount.toLocaleString("es-PY")} Gs
                        </span>
                        <span className="text-xs text-gray-400">total</span>
                      </div>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
