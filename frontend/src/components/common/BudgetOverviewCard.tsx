import { Card } from "flowbite-react";
import type { Project } from "../../types/Project";
import type { TFunction } from "i18next";
import type { Expense } from "../../types/Expense";
export type Props = {
  project: Project;
  expenses: Expense[];
  t: TFunction;
};
export default function BudgetOverviewCard({ project, expenses, t }: Props) {
  const budget = project?.totalPrice || 0;
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const remaining = budget - totalExpense;

  const percentage =
    budget > 0 ? Math.round(Math.min((totalExpense / budget) * 100, 100)) : 0;
  return (
    <>
      <Card className="bg-white! border-none shadow-sm shadow-gray-400!">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("projectInformation")}
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              {t("description")}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {project?.description}
            </p>
          </div>
        </div>
      </Card>
      <Card className="bg-white! border-none shadow-sm shadow-gray-400 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {t("budgetOverview")}
        </h3>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t("budgetUsage")}
          </span>
          <span className="text-sm font-bold text-gray-900">
            {`${percentage}%`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("totalBudget")}</p>
            <p className="text-lg font-bold text-gray-900">
              {budget.toLocaleString("es-Py")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("totalSpent")}</p>
            <p className="text-lg font-bold text-gray-900">
              {totalExpense.toLocaleString("es-Py")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("totalRemaning")}</p>
            <p className="text-lg font-bold text-gray-900">
              {remaining.toLocaleString("es-Py")}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
