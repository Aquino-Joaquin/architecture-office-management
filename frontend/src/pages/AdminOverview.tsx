import { MdOutlineDashboard } from "react-icons/md";
import AdminDashboard from "../components/AdminDashboard";
import LeftBar from "../components/LeftBar";
import type { LeftBarType } from "../types/LeftBarType";
import { LuFolders } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import type { CardInfomation } from "../types/CardInformation";
import { VscFileSubmodule } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import type { Projects } from "../types/Projects";
import type { Expenses } from "../types/Expenses";

export default function AdminOverview() {
  const leftBarInfomation: LeftBarType[] = [
    {
      title: "Dashboard",
      Icon: MdOutlineDashboard,
    },
    {
      title: "Projects",
      Icon: LuFolders,
    },
    {
      title: "Clients",
      Icon: PiUsers,
    },
    {
      title: "Expenses",
      Icon: CiMoneyCheck1,
    },
    {
      title: "Office Expenses",
      Icon: HiOutlineOfficeBuilding,
    },
    {
      title: "User Management",
      Icon: PiUsers,
    },
  ];
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
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0 overflow-y-auto">
        <LeftBar items={leftBarInfomation} />
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <AdminDashboard
          itemsInformation={cardInformations}
          itemsProjects={projects}
          itemsExpenses={expenses}
        />
      </main>
    </div>
  );
}
