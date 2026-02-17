import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const logo =
    theme === "nonedible"
      ? "https://i.ibb.co/DgVzJvFx/replateo-green.png"
      : "https://i.ibb.co/RpFwQhjC/replateo-orange.png";

  const buttonClass =
    theme === "nonedible"
      ? "bg-emerald-600 hover:bg-emerald-700"
      : "bg-orange-600 hover:bg-orange-700";

  const isActive = (path) => location.pathname === path;

  const languages = [
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ml", label: "മലയാളം" },
    { code: "hi", label: "हिन्दी" }
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language)?.label || "English";

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b shadow">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <img src={logo} alt="Logo" className="h-12 rounded-lg shadow-md" />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-7 font-medium">
          {[
            ["/", t("nav.home")],
            ["/edible", t("nav.edible")],
            ["/non-edible", t("nav.nonEdible")],
            ["/directory", t("nav.directory")],
            ["/listings", t("nav.listings")],
            ["/contact", t("nav.support")]
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={
                isActive(path)
                  ? "text-orange-700 font-semibold"
                  : "text-gray-800 hover:text-orange-700"
              }
            >
              {label}
            </Link>
          ))}

          {user && (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-white bg-orange-500 hover:bg-orange-600"
            >
              Dashboard
            </Link>
          )}

          {/* LANGUAGE (DESKTOP) */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-gray-800 hover:text-orange-700"
            >
              {currentLang} <span className="text-xs">▾</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow border py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-orange-50 ${
                      i18n.language === lang.code
                        ? "text-orange-700 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={user ? handleLogout : () => navigate("/auth")}
            className={`px-4 py-2 rounded-xl text-white ${buttonClass}`}
          >
            {user ? t("nav.logout") : t("nav.login")}
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-4 border-t text-left">
          {/* MAIN LINKS */}
          {[
            ["/", t("nav.home")],
            ["/edible", t("nav.edible")],
            ["/non-edible", t("nav.nonEdible")]
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-gray-800"
            >
              {label}
            </Link>
          ))}


          {/* OTHER LINKS */}
          {[
            ["/directory", t("nav.directory")],
            ["/listings", t("nav.listings")],
            ["/contact", t("nav.support")]
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-gray-800"
            >
              {label}
            </Link>
          ))}

          <hr className="my-2" />

          {/* MOBILE LANGUAGE */}
          <button
            onClick={() => setMobileLangOpen(!mobileLangOpen)}
            className="flex items-center gap-1 py-2 text-base font-medium text-gray-800"
          >
            {currentLang} <span className="text-xs">▾</span>
          </button>

          {mobileLangOpen && (
            <div className="mt-1 rounded-xl border bg-white shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-orange-50 ${
                    i18n.language === lang.code
                      ? "text-orange-700 font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={async () => {
              setMobileOpen(false);
              try {
                if (user) {
                  await logout();
                }
              } catch (err) {
                console.error("Logout error:", err);
              }
              navigate("/auth");
            }}
            className={`w-full mt-4 py-3 rounded-xl text-base font-semibold text-white ${buttonClass}`}
          >
            {user ? t("nav.logout") : t("nav.login")}
          </button>
        </div>
      )}
    </header>
  );
}