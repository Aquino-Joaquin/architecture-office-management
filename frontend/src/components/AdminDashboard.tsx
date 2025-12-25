import { Badge, Card } from "flowbite-react";
import type { CardInfomation } from "../types/CardInformation";
import type { Projects } from "../types/Projects";
import type { Expenses } from "../types/Expenses";

const getBadgeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "office":
      return "purple";
    case "project":
      return "blue";
  }
};

type AdminDashboardProps = {
  itemsInformation: CardInfomation[];
  itemsProjects: Projects[];
  itemsExpenses: Expenses[];
};

export default function AdminDashboard({
  itemsInformation,
  itemsProjects,
  itemsExpenses,
}: AdminDashboardProps) {
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black ">
          Admin Dashboard
        </h1>
        <p className="text-base font-normal text-gray-500 ">
          Welcome back! Here's your office overview.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-4">
        {itemsInformation.map(({ title, value, Icon }, index) => (
          <Card
            key={index}
            className="w-full shadow-sm hover:shadow-md transition-shadow bg-white! border-none"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card className="w-full shadow-sm bg-white! border-none">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black ">
              Recent Projects
            </h5>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {itemsProjects.map(({ title, client, price }, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-black ">
                        {title}
                      </p>
                      <p className="truncate text-sm text-gray-900 ">
                        {client}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      {price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full shadow-sm bg-white! border-none">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-black">
              Recent Expenses
            </h5>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {itemsExpenses.map(({ title, date, type, price }, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-black ">
                        {title}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="truncate text-sm text-gray-500 ">
                          {date}
                        </span>
                        <Badge color={getBadgeColor(type)} size="xs">
                          {type}
                        </Badge>
                      </div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      {price}
                    </div>
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
