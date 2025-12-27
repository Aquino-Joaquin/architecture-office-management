import { Card } from "flowbite-react";
import TableComponent from "./TableComponent";
import type { CardInfomation } from "../types/CardInformation";
import { MdAttachMoney, MdTrendingDown, MdTrendingUp } from "react-icons/md";
import type { Expense } from "../types/Expense";
import ExpenseRowComponent from "./ExpenseRowComponent";

const titles: string[] = [
  "Id",
  "Description",
  "Created at",
  "Type",
  "Project",
  "Amount",
];
const expenseInformation: CardInfomation[] = [
  {
    title: "Total Expense",
    value: 200,
    Icon: MdAttachMoney,
  },
  {
    title: "Project Expenses",
    value: 200,
    Icon: MdTrendingUp,
  },
  {
    title: "Office Expenses",
    value: 200,
    Icon: MdTrendingDown,
  },
];
const expenses: Expense[] = [
  {
    id: 1,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "office",
  },
  {
    id: 2,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "office",
  },
  {
    id: 3,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "project",
  },
];

export default function ExpensesComponent() {
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black ">
          Expense
        </h1>
        <p className="text-base font-normal text-gray-500 ">
          Here you can see your expense overview
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {expenseInformation.map(({ title, value, Icon }, index) => (
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

      <TableComponent<Expense>
        titles={titles}
        rows={expenses}
        renderRow={(expense) => (
          <ExpenseRowComponent key={expense.id} expense={expense} />
        )}
      />
    </div>
  );
}
