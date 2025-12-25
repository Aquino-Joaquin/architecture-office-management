import {
  Avatar,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import type { LeftBarType } from "../types/LeftBarType";
import { useNavigate } from "react-router-dom";
type LeftBarProps = {
  items: LeftBarType[];
};

export default function LeftBar({ items }: LeftBarProps) {
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
          <div className="flex flex-wrap gap-2">
            <Avatar rounded />
            <h1 className="text-center items-center text-lg font-medium text-black">
              Joaquin
              <br />
              <span className="text-gray-500 font-medium">Admin</span>
            </h1>
          </div>

          <SidebarItem
            className="text-black! hover:text-gray-50"
            href="#"
            icon={HiChartPie}
          >
            Log out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
