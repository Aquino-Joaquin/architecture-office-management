import { Button, Card } from "flowbite-react";
import type { CardInfomation } from "../types/CardInformation";
import {
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiPlus,
} from "react-icons/hi";
import TableComponent from "./TableComponent";
import type { Expense } from "../types/Expense";
import ExpenseRowComponent from "./ExpenseRowComponent";
const projecInformation: CardInfomation[] = [
  {
    title: "Budget",
    value: 200,
    Icon: HiOutlineCurrencyDollar,
  },
  {
    title: "Spent",
    value: 200,
    Icon: HiOutlineTrendingUp,
  },
  {
    title: "Remaning",
    value: 200,
    Icon: HiOutlineCurrencyDollar,
  },
];
const titles: string[] = [
  "Id",
  "Description",
  "Created at",
  "Type",
  "Project",
  "Amount",
  "Actions",
];
const expenses: Expense[] = [
  {
    id: 1,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "office",
  },
  {
    id: 2,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "office",
  },
  {
    id: 3,
    amount: 200,
    description: "Una Description",
    createdAt: new Date("22-09-2002"),
    type: "project",
  },
];
export default function ProjectDetails() {
  const teamMembers = [
    { name: "John Smith", role: "Lead Architect", initials: "J" },
    { name: "Sarah Johnson", role: "Structural Engineer", initials: "S" },
    { name: "Mike Ross", role: "Interior Designer", initials: "M" },
  ];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-black ">
            Projects Details
          </h1>
          <p className="text-base font-normal text-gray-500 ">
            Here you can see all your project Details
          </p>
        </div>
        <Button color="blue">
          <HiPlus className="mr-2 h-5 w-5" />
          Edit Project
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {projecInformation.map(({ title, value, Icon }, index) => (
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
      <div className="p-4 w-full bg-gray-50 ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <Card className="bg-white! border-none shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Project Information
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    A modern 15-story office complex featuring sustainable
                    design elements, open workspaces, and advanced technology
                    infrastructure. The project includes underground parking,
                    retail space on ground floor, and rooftop amenities.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* --- 2. BUDGET OVERVIEW (2/3 del ancho) --- */}
          <div className="lg:col-span-2">
            <Card className="bg-white! border-none shadow-sm h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Budget Overview
              </h3>

              {/* Barra de Progreso Customizada para que se vea verde como en la imagen */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Budget Usage
                  </span>
                  <span className="text-sm font-bold text-gray-900">65.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </Card>
          </div>

          {/* --- 3. TEAM MEMBERS (1/3 del ancho) --- */}
          <div className="lg:col-span-1">
            <Card className="bg-white! border-none shadow-sm h-full">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Team Members
                </h3>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    {/* Avatar Circular con Inicial */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      {member.initials}
                    </div>

                    {/* Texto */}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {/* Título de la Sección */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 pl-3">
            Project Expenses
          </h2>
          {/* Opcional: Podrías poner un botón de "Exportar" o "Filtros" aquí */}
        </div>

        {/* Contenedor estilo Card para la Tabla */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <TableComponent<Expense>
            titles={titles}
            rows={expenses}
            renderRow={(expense) => (
              <ExpenseRowComponent key={expense.id} expense={expense} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
