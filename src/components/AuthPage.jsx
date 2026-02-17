import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { login, register, googleLogin, resetPassword, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [role, setRole] = useState("user");
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    licenceId: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  /* ===================== SEND OTP FOR REGISTRATION ===================== */

  const sendOtp = async () => {
    if (!form.email.trim()) {
      addToast("Email is required", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Failed to send OTP", "error");
      } else {
        addToast("OTP sent to your email", "success");
        setOtpSent(true);
      }
    } catch (err) {
      console.error("OTP Error:", err);
      addToast("Server error while sending OTP", "error");
    }

    setLoading(false);
  };

  const verifyOtpAndCreateAccount = async () => {
    if (!otp.trim()) {
      addToast("Enter the OTP", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Invalid OTP", "error");
        setLoading(false);
        return;
      }

      // OTP VERIFIED → NOW CREATE FIREBASE USER
      await register({
        email: form.email,
        password: form.password,
        name: form.name,
        role: role,
        licenceId: form.licenceId,
      });

      addToast("Account created successfully", "success");
      navigate("/dashboard");
    } catch (error) {
      addToast(error.message || "Registration failed", "error");
    }

    setLoading(false);
  };

  /* ===================== SEND PASSWORD RESET EMAIL ===================== */

  const handleSendResetEmail = async () => {
    if (!form.email.trim()) {
      addToast("Email is required", "error");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(form.email);
      addToast("Password reset link sent to your email", "success");
      setResetEmailSent(true);
    } catch (err) {
      addToast(err.message || "Failed to send reset email", "error");
    }

    setLoading(false);
  };



  /* ===================== LOGIN / REGISTER ===================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      handleSendResetEmail();
      return;
    }

    if (tab === "login") {
      setLoading(true);
      try {
        await login(form.email, form.password);
        addToast("Login successful", "success");
        navigate("/dashboard");
      } catch (err) {
        addToast("Authentication error", "error");
      }
      setLoading(false);
      return;
    }

    // REGISTER
    if (role === "ngo" && !form.licenceId.trim()) {
      addToast("Licence ID is required for NGOs", "error");
      return;
    }

    if (!otpSent) {
      sendOtp();
    } else {
      verifyOtpAndCreateAccount();
    }
  };

  /* ===================== UI ===================== */

  return (
    <section className="page-section relative">
      <div className="absolute inset-0 -z-10 bg-orange-100" />

      <div className="page-container flex justify-center">
        <div className="w-full max-w-md p-10 rounded-3xl bg-white shadow-xl">
          {/* ROLE */}
          <div className="flex justify-center gap-4 mb-6">
            {["user", "ngo"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${role === r ? "bg-orange-600 text-white" : "bg-gray-100"
                  }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* TABS */}
          {!isForgotPassword && (
            <div className="flex justify-around mb-8 border-b">
              <button
                onClick={() => {
                  setTab("login");
                  setOtpSent(false);
                  setOtp("");
                }}
                className={`pb-2 px-4 transition-all ${tab === "login"
                  ? "border-b-2 border-orange-600 text-orange-600 font-bold"
                  : "text-gray-400"
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setTab("register");
                  setOtpSent(false);
                  setOtp("");
                }}
                className={`pb-2 px-4 transition-all ${tab === "register"
                  ? "border-b-2 border-orange-600 text-orange-600 font-bold"
                  : "text-gray-400"
                  }`}
              >
                Register
              </button>
            </div>
          )}

          {isForgotPassword && (
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your email to receive a reset link</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && !isForgotPassword && (
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
              />
            )}

            {tab === "register" && role === "ngo" && !isForgotPassword && (
              <input
                placeholder="NGO Licence ID"
                value={form.licenceId}
                onChange={(e) =>
                  setForm({ ...form, licenceId: e.target.value })
                }
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
              />
            )}

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
              disabled={isForgotPassword && resetEmailSent}
            />

            {!isForgotPassword && (
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
              />
            )}

            {tab === "register" && otpSent && !isForgotPassword && (
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none text-center text-2xl tracking-widest"
              />
            )}

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50" disabled={loading}>
              {loading
                ? "Please wait..."
                : isForgotPassword
                  ? "Send Reset Link"
                  : tab === "login"
                    ? "Login"
                    : otpSent
                      ? "Verify & Register"
                      : "Send Verification Code"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            {isForgotPassword && resetEmailSent && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                <p className="text-green-700 text-sm">
                  Reset link sent! Check your email and follow the link to reset your password.
                </p>
              </div>
            )}

            {tab === "login" && !isForgotPassword && (
              <button
                onClick={() => {
                  setIsForgotPassword(true);
                  setResetEmailSent(false);
                }}
                className="w-full text-orange-600 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            )}

            {isForgotPassword && (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetEmailSent(false);
                  setForm({ ...form, email: "" });
                }}
                className="w-full text-gray-500 text-sm font-semibold hover:underline"
              >
                Back to Login
              </button>
            )}

            <button
              onClick={() => googleLogin(role)}
              className="w-full p-3 border rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-semibold"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
