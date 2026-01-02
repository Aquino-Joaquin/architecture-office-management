import { Card } from "flowbite-react";
import TableComponent from "./TableComponent";
import type { User } from "../types/User";
import UserRowComponent from "./UserRowComponent";
import type { CardInfomation } from "../types/CardInformation";
import {
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi";
import Header from "./common/Header";
import { useEffect, useState } from "react";
import { api } from "../helper/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const titles: string[] = ["Id", "Name", "Email", "Role", "Projects", "Actions"];

export default function UserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersInformation, setUsersInfomation] = useState<CardInfomation[]>([]);
  const navigate = useNavigate();

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
        title: "Total Users",
        value: totalUsersCount,
        Icon: HiOutlineUsers,
      },
      {
        title: "Admins",
        value: totalAdminsCount,
        Icon: HiOutlineShieldCheck,
      },
      {
        title: "Staff",
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
        title={"User Management"}
        subTitle={"Here you can manage all the users"}
        buttonTitle={"Add new user"}
        buttonPath="newuser"
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
