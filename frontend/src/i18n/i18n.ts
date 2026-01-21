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

const resources = {
  en: {
    adminDashboard: enAdminDashboardTitles,
    leftBar: enLeftBarText,
    project: enProject,
    client: enClient,
    user: enUser,
  },
  es: {
    adminDashboard: esAdminDashboardTitles,
    leftBar: esLeftBarText,
    project: esProject,
    client: esClient,
    user: esUser,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  ns: ["adminDashboard", "leftBar", "project", "client", "user"],
  defaultNS: "adminDashboard",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
