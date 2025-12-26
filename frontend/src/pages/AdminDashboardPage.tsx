import { VscFileSubmodule } from "react-icons/vsc";
import AdminDashboard from "../components/AdminDashboard";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import { FiUsers } from "react-icons/fi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import type { Expense } from "../types/Expense";

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
  const projects: Project[] = [
    {
      id: 1,
      name: "Joaquin",
      description: "Bueno bueno bueno chicos",
      status: "On going",
      totalPrice: 1200,
      amoutPaid: 500,
      client: {
        id: 1,
        name: "Pepe",
        phone: 4238719,
      },
    },
    {
      id: 1,
      name: "Joaquin",
      description: "Bueno bueno bueno chicos",
      status: "On going",
      totalPrice: 1200,
      amoutPaid: 500,
      client: {
        id: 1,
        name: "Pepe",
        phone: 4238719,
      },
    },
  ];
  const expenses: Expense[] = [
    {
      id: 1,
      amount: 100,
      description: "Gasto normal",
      createdAt: new Date("2025-03-10"),
      type: "office",
    },
    {
      id: 1,
      amount: 100,
      description: "Gasto normal",
      createdAt: new Date("2025-03-10"),
      type: "office",
    },
    {
      id: 1,
      amount: 100,
      description: "Gasto normal",
      createdAt: new Date("2025-03-10"),
      type: "office",
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
