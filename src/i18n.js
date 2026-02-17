// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON files
import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import ta from "./locales/ta/translation.json";
import te from "./locales/te/translation.json";
import kn from "./locales/kn/translation.json";
import ml from "./locales/ml/translation.json";

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") : null;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ta: { translation: ta },
      te: { translation: te },
      kn: { translation: kn },
      ml: { translation: ml }
    },
    lng: savedLang || "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// whenever language changes, keep it in localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);
  }
});

export default i18n;