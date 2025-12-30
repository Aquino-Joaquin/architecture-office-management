import type { CardInfomation } from "../types/CardInformation";
import { HiOutlineCurrencyDollar, HiOutlineTrendingUp } from "react-icons/hi";
import TableComponent from "./TableComponent";
import type { Expense } from "../types/Expense";
import ExpenseRowComponent from "./ExpenseRowComponent";
import Header from "./common/Header";
import { Card } from "flowbite-react";
import { api } from "../helper/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
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
  const [project, setProject] = useState<Project>();
  const { id } = useParams();
  async function fetchProject(id: number) {
    await api.get(`projects/${id}`).then((res) => setProject(res.data));
  }

  const projecInformation: CardInfomation[] = [
    {
      title: "Budget",
      value: project?.totalPrice || 0,
      Icon: HiOutlineCurrencyDollar,
    },
    {
      title: "Paid",
      value: project?.amountPaid || 0,
      Icon: HiOutlineTrendingUp,
    },
    {
      title: "Remaning",
      value: project ? project?.totalPrice - project?.amountPaid : 0,
      Icon: HiOutlineCurrencyDollar,
    },
  ];
  useEffect(() => {
    fetchProject(Number(id));
  }, [id]);

  const budget = project?.amountPaid;
  const totalExpense = project?.expenses
    ? project.expenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;
  const remaining = budget && budget - totalExpense;
  const percentage =
    budget && (totalExpense / budget != 0 ? totalExpense / budget : 1) * 100;

  return (
    <div>
      <Header
        title={"Project Details"}
        subTitle={"Here you can see all your project details"}
      />

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
                    {project?.description}
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
                  <span className="text-sm font-bold text-gray-900">
                    {`${percentage}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                  <p className="text-lg font-bold text-gray-900">{budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                  <p className="text-lg font-bold text-gray-900">
                    {totalExpense}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Remaining</p>
                  <p className="text-lg font-bold text-gray-900">{remaining}</p>
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
                {project?.users &&
                  project?.users.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      {/* Avatar Circular con Inicial */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        {member.name.charAt(0)}
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
