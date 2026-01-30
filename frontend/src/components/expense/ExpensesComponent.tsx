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
import { useTranslation } from "react-i18next";
import { showErrors } from "../../helper/showError";
import ConfirmationDelete from "../common/ConfirmationDelete";

export default function ExpensesComponent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const { t } = useTranslation(["expense", "successToast"]);

  const titles: string[] = [
    "Id",
    t("tableExpenseDescription"),
    t("tableExpenseCreatedAt"),
    t("tableExpenseType"),
    t("tableExpenseProject"),
    t("tableExpenseAmount"),
    t("tableExpenseActions"),
  ];

  const isAdmin = checkAdmin();

  async function fetchExpenses() {
    await api.get("expenses").then((res) => setExpenses(res.data));
  }
  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const totalOfficeExpense =
    expenses &&
    expenses
      .filter((expense) => expense.expenseType.name === "Office")
      .reduce((total, officeExpense) => total + officeExpense.amount, 0);
  const totalProjectExpense =
    expenses &&
    expenses
      .filter((expense) => expense.expenseType.name === "Project")
      .reduce((total, projectExpense) => total + projectExpense.amount, 0);

  const expenseInformation: CardInfomation[] = [
    {
      title: t("totalExpense"),
      value: totalExpense.toLocaleString("es-PY"),
      Icon: MdAttachMoney,
    },
    {
      title: t("officeExpense"),
      value: totalOfficeExpense.toLocaleString("es-Py"),
      Icon: MdTrendingUp,
    },
    {
      title: t("projectExpense"),
      value: totalProjectExpense.toLocaleString("es-Py"),
      Icon: MdTrendingDown,
    },
  ];

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `expenses/${id}`,
        method: "delete",
      });
      toast.success(t("successToast:deleteExpense"));
      fetchExpenses();
    } catch (error) {
      showErrors(error);
    }
  }
  function handleEdit(id: number) {
    navigate(`editexpense/${id}`);
  }
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <Header
        title={t("title")}
        subTitle={t("subtitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newexpense"
        showButton={true}
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
            handleDelete={() => {
              setConfirmAction(() => () => handleDelete(expense.id));
              setOpenDelete(true);
            }}
            handleEdit={handleEdit}
            canDoActions={isAdmin}
          />
        )}
      />
      <ConfirmationDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await confirmAction?.();
          setOpenDelete(false);
        }}
        description={t("deleteDescription")}
        yes={t("yesOption")}
        no={t("noOption")}
      />
    </div>
  );
}
