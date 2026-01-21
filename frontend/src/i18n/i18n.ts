import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enAdminDashboardTitles from "./en/adminDashboard.json";
import esAdminDashboardTitles from "./es/adminDashboard.json";
import enLeftBarText from "./en/leftBar.json";
import esLeftBarText from "./es/leftBar.json";
import enProject from "./en/project.json";
import esProject from "./es/project.json";

const resources = {
  en: {
    adminDashboard: enAdminDashboardTitles,
    leftBar: enLeftBarText,
    project: enProject,
  },
  es: {
    adminDashboard: esAdminDashboardTitles,
    leftBar: esLeftBarText,
    project: esProject,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  ns: ["adminDashboard", "leftBar", "project"],
  defaultNS: "adminDashboard",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
