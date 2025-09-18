import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "@/locales/translations";
import settings from "@/config/settings";

const resources = {
  en: {
    translation: translations.en,
  },
  ru: {
    translation: translations.ru,
  },
  uz: {
    translation: translations.uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || settings.defaultLanguage,

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export const { t, changeLanguage, language } = i18n;