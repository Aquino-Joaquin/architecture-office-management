import { MdOutlineDashboard } from "react-icons/md";
import type { LeftBarType } from "../types/LeftBarType";
import { LuFolders } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
import { PiUsers } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import LeftBar from "../components/common/LeftBar";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function GeneralOverview() {
  const { t } = useTranslation("leftBar");
  const leftBarInfomationAdmin: LeftBarType[] = [
    {
      title: t("dashboard"),
      Icon: MdOutlineDashboard,
      path: "",
    },
    {
      title: t("projects"),
      Icon: LuFolders,
      path: "projects",
    },
    {
      title: t("clients"),
      Icon: PiUsers,
      path: "clients",
    },
    {
      title: t("expenses"),
      Icon: CiMoneyCheck1,
      path: "expenses",
    },
    {
      title: t("userManagement"),
      Icon: PiUsers,
      path: "users",
    },
  ];
  const leftBarInfomationStaff: LeftBarType[] = [
    {
      title: "Dashboard",
      Icon: MdOutlineDashboard,
      path: "/staff",
    },
    {
      title: "Projects",
      Icon: LuFolders,
      path: "projects",
    },
  ];
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const leftBarInfomation: LeftBarType[] =
    user?.role == "Admin" ? leftBarInfomationAdmin : leftBarInfomationStaff;
  return (
    <div className="flex h-screen overflow-hidden">
      <ToastContainer position="top-center" autoClose={2000} />
      <aside className="w-64 shrink-0 overflow-y-auto">
        {user && <LeftBar items={leftBarInfomation} user={user} />}
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
        {}
      </main>
    </div>
  );
}
