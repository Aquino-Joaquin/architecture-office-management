import { Card } from "flowbite-react";
import TableComponent from "../common/TableComponent";
import type { CardInfomation } from "../../types/CardInformation";
import { MdAttachMoney, MdTrendingDown, MdTrendingUp } from "react-icons/md";
import type { Expense } from "../../types/Expense";
import ExpenseRowComponent from "./ExpenseRowComponent";
import Header from "../common/Header";
import { api } from "../../helper/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";

const titles: string[] = [
  "Id",
  "Description",
  "Created at",
  "Type",
  "Project",
  "Amount",
];

export default function ExpensesComponent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();

  const isAdmin = checkAdmin();

  async function fetchExpenses() {
    await api.get("expenses").then((res) => setExpenses(res.data));
  }
  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const totalOfficeExpense = expenses
    .filter((expense) => expense.type === "Office")
    .reduce((total, officeExpense) => total + officeExpense.amount, 0);
  const totalProjectExpense = expenses
    .filter((expense) => expense.type === "Project")
    .reduce((total, projectExpense) => total + projectExpense.amount, 0);

  const expenseInformation: CardInfomation[] = [
    {
      title: "Total Expense",
      value: totalExpense,
      Icon: MdAttachMoney,
    },
    {
      title: "Project Expenses",
      value: totalOfficeExpense,
      Icon: MdTrendingUp,
    },
    {
      title: "Office Expenses",
      value: totalProjectExpense,
      Icon: MdTrendingDown,
    },
  ];

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `expenses/${id}`,
        method: "delete",
      });
      toast.success("Expense deleted successfully");
      fetchExpenses();
    } catch (error) {
      toast.error("Error deleting project");
    }
  }
  function handleEdit(id: number) {
    navigate(`editexpense/${id}`);
  }
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <Header
        title={"Expense"}
        subTitle={"Here you can see your expense overview"}
        buttonTitle="Create new expense"
        buttonPath="newexpense"
      />

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
          <ExpenseRowComponent
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            canDoActions={isAdmin}
          />
        )}
      />
    </div>
  );
}
