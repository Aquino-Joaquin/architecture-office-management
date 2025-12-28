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

const titles: string[] = ["Id", "Name", "Email", "Role", "Projects", "Actions"];
const userInformation: CardInfomation[] = [
  {
    title: "Total Users",
    value: 200,
    Icon: HiOutlineUsers,
  },
  {
    title: "Admins",
    value: 200,
    Icon: HiOutlineShieldCheck,
  },
  {
    title: "Staff",
    value: 200,
    Icon: HiOutlineBriefcase,
  },
];
const users: User[] = [
  {
    id: 1,
    name: "Temp",
    email: "esteesunemail@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Temp",
    email: "esteesunemail@gmail.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Temp",
    email: "esteesunemail@gmail.com",
    role: "Admin",
  },
  {
    id: 4,
    name: "Temp",
    email: "esteesunemail@gmail.com",
    role: "Admin",
  },
];

export default function UserComponent() {
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <Header
        title={"User Management"}
        subTitle={"Here you can manage all the users"}
        buttonTitle={"Add new user"}
        buttonPath="/newuser"
      />
      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {userInformation.map(({ title, value, Icon }, index) => (
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
        renderRow={(user) => <UserRowComponent key={user.id} user={user} />}
      />
    </div>
  );
}
