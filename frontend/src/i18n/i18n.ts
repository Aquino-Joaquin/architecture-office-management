import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enAdminDashboardTitles from "./en/adminDashboard.json";
import esAdminDashboardTitles from "./es/adminDashboard.json";

const resources = {
  en: {
    adminDashboard: enAdminDashboardTitles,
  },
  es: {
    adminDashboard: esAdminDashboardTitles,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  ns: ["adminDashboard"],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
