import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enAdminDashboardTitles from "./en/adminDashboard.json";
import esAdminDashboardTitles from "./es/adminDashboard.json";
import enLeftBarText from "./en/leftBar.json";
import esLeftBarText from "./es/leftBar.json";
import enProject from "./en/project.json";
import esProject from "./es/project.json";
import enClient from "./en/client.json";
import esClient from "./es/client.json";
import enUser from "./en/user.json";
import esUser from "./es/user.json";
import enExpense from "./en/expense.json";
import esExpense from "./es/expense.json";
import enProjectDetails from "./en/projectDetails.json";
import esProjectDetails from "./es/projectDetails.json";
import enMilestone from "./en/milestone.json";
import esMilestone from "./es/milestone.json";
import enTask from "./en/task.json";
import esTask from "./es/task.json";
import enDocuments from "./en/documents.json";
import esDocuments from "./es/documents.json";
import enLogin from "./en/login.json";
import esLogin from "./es/login.json";

const resources = {
  en: {
    adminDashboard: enAdminDashboardTitles,
    leftBar: enLeftBarText,
    project: enProject,
    client: enClient,
    user: enUser,
    expense: enExpense,
    projectDetails: enProjectDetails,
    milestone: enMilestone,
    task: enTask,
    documents: enDocuments,
    login: enLogin,
  },
  es: {
    adminDashboard: esAdminDashboardTitles,
    leftBar: esLeftBarText,
    project: esProject,
    client: esClient,
    user: esUser,
    expense: esExpense,
    projectDetails: esProjectDetails,
    milestone: esMilestone,
    task: esTask,
    documents: esDocuments,
    login: esLogin,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  ns: [
    "adminDashboard",
    "leftBar",
    "project",
    "client",
    "user",
    "expense",
    "milestone",
    "task",
    "documents",
    "login",
  ],
  defaultNS: "adminDashboard",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
