import TableComponent from "../common/TableComponent";
import type { CardInfomation } from "../../types/CardInformation";
import { MdAttachMoney, MdTrendingDown, MdTrendingUp } from "react-icons/md";
import type { Expense } from "../../types/Expense";
import ExpenseRowComponent from "./ExpenseRowComponent";
import Header from "../common/Header";
import { api } from "../../helper/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";
import { useTranslation } from "react-i18next";
import ConfirmationDelete from "../common/ConfirmationDelete";
import InformationGrid from "../common/InformationGrid";
import { handleDelete } from "../../helper/handleDelete";

export default function ExpensesComponent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const { t } = useTranslation(["expense", "successToast"]);

  const titles: string[] = [
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

  function handleEdit(id: number) {
    navigate(`editexpense/${id}`);
  }
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={t("title")}
        subTitle={t("subtitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newexpense"
        showButton={true}
      />

      <InformationGrid information={expenseInformation} columnNo={3} />
      <div className="bg-white shadow-sm shadow-gray-400 rounded-2xl">
        <TableComponent<Expense>
          titles={titles}
          rows={expenses}
          tabs={[t("allExpense"), t("office"), t("project")]}
          enableMonthFilter={true}
          renderRow={(expense) => (
            <ExpenseRowComponent
              key={expense.id}
              expense={expense}
              handleDelete={() => {
                setConfirmAction(() => async () => {
                  if (await handleDelete(expense.id, "expenses", t)) {
                    fetchExpenses();
                  }
                });
                setOpenDelete(true);
              }}
              handleEdit={handleEdit}
              canDoActions={isAdmin}
            />
          )}
          filterFn={(expenses, search, activeTab, selectedMonth) => {
            const matchesSearch = expenses.description
              .toLowerCase()
              .includes(search.toLowerCase());
            const matchesTab =
              activeTab === t("allExpense") ||
              expenses.expenseType.name ===
                (activeTab === t("office") ? "Office" : "Project");
            const matchesMonth =
              !selectedMonth ||
              (() => {
                const date = new Date(expenses.createdAt);

                if (isNaN(date.getTime())) return false;

                const yearMonth = `${date.getFullYear()}-${String(
                  date.getMonth() + 1,
                ).padStart(2, "0")}`;

                return yearMonth === selectedMonth;
              })();
            return matchesSearch && matchesTab && matchesMonth;
          }}
          searchPlaceHolder={t("search")}
        />
      </div>

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
