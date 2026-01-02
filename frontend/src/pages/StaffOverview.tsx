import { MdOutlineDashboard } from "react-icons/md";
import type { LeftBarType } from "../types/LeftBarType";
import { LuFolders } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import LeftBar from "../components/common/LeftBar";

export default function SatffOverview() {
  const leftBarInfomation: LeftBarType[] = [
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

  return (
    <div className="flex h-screen overflow-hidden">
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
