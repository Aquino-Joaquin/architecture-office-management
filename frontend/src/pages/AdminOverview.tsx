import { MdOutlineDashboard } from "react-icons/md";
import LeftBar from "../components/LeftBar";
import type { LeftBarType } from "../types/LeftBarType";
import { LuFolders } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { PiUsers } from "react-icons/pi";
import { Outlet } from "react-router-dom";

export default function AdminOverview() {
  const leftBarInfomation: LeftBarType[] = [
    {
      title: "Dashboard",
      Icon: MdOutlineDashboard,
      path: "",
    },
    {
      title: "Projects",
      Icon: LuFolders,
      path: "/projects",
    },
    {
      title: "Clients",
      Icon: PiUsers,
      path: "/clients",
    },
    {
      title: "Expenses",
      Icon: CiMoneyCheck1,
      path: "/expenses",
    },
    {
      title: "User Management",
      Icon: PiUsers,
      path: "/users",
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0 overflow-y-auto">
        <LeftBar items={leftBarInfomation} />
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
        {}
      </main>
    </div>
  );
}
