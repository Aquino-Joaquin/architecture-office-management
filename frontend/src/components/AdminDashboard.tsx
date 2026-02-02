import { Badge, Card } from "flowbite-react";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import type { Expense } from "../types/Expense";
import Header from "./common/Header";
import { formatDateDMY } from "../helper/formatDateDMY";
import { getBadgeColor } from "../helper/getBadgeColor";
import { useTranslation } from "react-i18next";
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

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header title={t("headerTitle")} subTitle={t("headerSubtitle")} />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {itemsInformation.map(({ title, value, Icon }, index) => (
          <Card
            key={index}
            className="w-full shadow-sm shadow-gray-400 hover:shadow-md transition-shadow bg-white! border-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black ">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {value}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 ">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  w-full">
        <Card className="w-full shadow-sm shadow-gray-400 bg-white! border-none flex flex-col h-full ">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black ">
              {t("recentProjects")}
            </h5>
          </div>
          <div className="grow -mx-6">
            <ul className="divide-y divide-gray-300! dark:divide-gray-700 w-full ">
              <hr className="border-gray-300" />
              {itemsProjects.map(({ id, name, status, totalPrice, client }) => (
                <li
                  key={id}
                  className="py-3 sm:py-4 hover:bg-gray-50 transition-colors duration-200 "
                >
                  <div className="flex items-center space-x-4 mx-6">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-black ">
                        {name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="truncate text-sm text-gray-500 ">
                          {client.name}
                        </span>
                        <Badge color={getBadgeColor(status)} size="xs">
                          {t(`badgeStatus:${status}`)}
                        </Badge>
                      </div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      {`${totalPrice.toLocaleString("es-PY")} Gs`}
                    </div>
                  </div>
                </li>
              ))}
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
            <ul className="divide-y divide-gray-300! dark:divide-gray-700">
              <hr className="border-gray-300" />
              {itemsExpenses.map(
                ({ id, description, amount, createdAt, expenseType }) => (
                  <li
                    key={id}
                    className="py-3 sm:py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between space-x-4 mx-6">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-black ">
                          {description}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="truncate text-sm text-gray-500 ">
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
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                        {`${amount.toLocaleString("es-PY")} Gs`}
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
