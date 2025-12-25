import { VscFileSubmodule } from "react-icons/vsc";
import AdminDashboard from "../components/AdminDashboard";
import type { CardInfomation } from "../types/CardInformation";
import type { Projects } from "../types/Projects";
import { FiUsers } from "react-icons/fi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import type { Expenses } from "../types/Expenses";

export default function AdminDashboardPage() {
  const cardInformations: CardInfomation[] = [
    {
      title: "Active Projects",
      value: 200,
      Icon: VscFileSubmodule,
    },
    {
      title: "Clients",
      value: 200,
      Icon: FiUsers,
    },
    {
      title: "Budget",
      value: 200,
      Icon: GiMoneyStack,
    },
    {
      title: "Expenses",
      value: 200,
      Icon: GiExpense,
    },
  ];
  const projects: Projects[] = [
    {
      title: "Gastos",
      client: "Pepe",
      price: 200,
    },
    {
      title: "Gastos",
      client: "Pepe",
      price: 200,
    },
    {
      title: "Gastos",
      client: "Pepe",
      price: 200,
    },
    {
      title: "Gastos",
      client: "Pepe",
      price: 200,
    },
    {
      title: "Gastos",
      client: "Pepe",
      price: 200,
    },
  ];
  const expenses: Expenses[] = [
    {
      title: "Gastos",
      date: "22-09-2002",
      type: "office",
      price: 200,
    },
    {
      title: "Gastos",
      date: "22-09-2002",
      type: "office",
      price: 200,
    },
    {
      title: "Gastos",
      date: "22-09-2002",
      type: "office",
      price: 200,
    },
    {
      title: "Gastos",
      date: "22-09-2002",
      type: "project",
      price: 200,
    },
    {
      title: "Gastos",
      date: "22-09-2002",
      type: "project",
      price: 200,
    },
  ];

  return (
    <AdminDashboard
      itemsInformation={cardInformations}
      itemsProjects={projects}
      itemsExpenses={expenses}
    />
  );
}
