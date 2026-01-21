import { Card } from "flowbite-react";
import {
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";
import type { CardInfomation } from "../../types/CardInformation";
import { api } from "../../helper/api";
import Header from "../common/Header";
import TableComponent from "../common/TableComponent";
import UserRowComponent from "./UserRowComponent";
import { useTranslation } from "react-i18next";

export default function UserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersInformation, setUsersInfomation] = useState<CardInfomation[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation("user");
  const titles: string[] = [
    "Id",
    t("tableUserName"),
    t("tableUserEmail"),
    t("tableUserRole"),
    t("tableUserProjects"),
    t("tableUserActions"),
  ];

  async function fetchUser() {
    const res = await api.get<User[]>("users");
    const data = res.data;

    const totalUsersCount = data.length;
    const totalAdminsCount = data.filter(
      (user) => user.role === "Admin"
    ).length;
    const totalStaffCount = data.filter((user) => user.role === "Staff").length;

    setUsers(data);

    setUsersInfomation([
      {
        title: t("totalUsers"),
        value: totalUsersCount,
        Icon: HiOutlineUsers,
      },
      {
        title: t("admins"),
        value: totalAdminsCount,
        Icon: HiOutlineShieldCheck,
      },
      {
        title: t("staff"),
        value: totalStaffCount,
        Icon: HiOutlineBriefcase,
      },
    ]);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `users/${id}`,
        method: "delete",
      });
      toast.success("Client deleted successfully");
      fetchUser();
    } catch (error) {
      toast.error("Error deleting user");
    }
  }
  function handleEdit(id: number) {
    navigate(`editUser/${id}`);
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <Header
        title={t("title")}
        subTitle={t("subTitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newuser"
        showButton={true}
      />
      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {usersInformation.map(({ title, value, Icon }, index) => (
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

      <TableComponent<User>
        titles={titles}
        rows={users}
        renderRow={(user) => (
          <UserRowComponent
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      />
    </div>
  );
}
