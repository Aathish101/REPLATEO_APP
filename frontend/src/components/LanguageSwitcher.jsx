// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", labelKey: "language.english" },
  { code: "hi", labelKey: "language.hindi" },
  { code: "ta", labelKey: "language.tamil" },
  { code: "te", labelKey: "language.telugu" },
  { code: "kn", labelKey: "language.kannada" },
  { code: "ml", labelKey: "language.malayalam" }
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang); // localStorage saving is handled in i18n.js
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="px-3 py-1 rounded-lg border border-orange-200 text-sm bg-white text-gray-700 hover:border-orange-400 cursor-pointer"
    >
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {t(lng.labelKey)}
        </option>
      ))}
    </select>
  );
}