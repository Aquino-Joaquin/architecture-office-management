import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import type { LeftBarType } from "../types/LeftBarType";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
type LeftBarProps = {
  items: LeftBarType[];
  user?: User;
};

export default function LeftBar({ items, user }: LeftBarProps) {
  const navigate = useNavigate();

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="bg-white [&>div]:bg-white"
    >
      <SidebarItems className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-2 py-3">
          <img
            src="../logo.svg"
            alt="Architecture Office Logo"
            className="w-12 h-12 rounded-lg"
          />
          <h1 className="font-medium">Architecture Office</h1>
        </div>

        <SidebarItemGroup>
          {items.map(({ title, Icon, path }) => (
            <SidebarItem
              key={path}
              className="text-black! hover:text-gray-50"
              icon={Icon}
              onClick={() => navigate(path)}
            >
              {title}
            </SidebarItem>
          ))}
        </SidebarItemGroup>

        <SidebarItemGroup className="mt-auto">
          <div className="ml-5 flex flex-wrap gap-5 justify-baseline">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
              {user?.name?.charAt(0) ?? "?"}
            </div>

            <h1 className="text-lg font-medium text-black">
              {user?.name ?? "Loading..."}
              <br />
              <span className="text-gray-500 font-medium">
                {user?.role ?? ""}
              </span>
            </h1>
          </div>

          <SidebarItem
            className="text-black! hover:text-gray-50"
            icon={HiChartPie}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Log out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
