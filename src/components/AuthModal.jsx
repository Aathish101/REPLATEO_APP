  import { X } from "lucide-react";
  import { useState, useEffect } from "react";
  import { useAuth } from "../context/AuthContext";
  import { useToast } from "../context/ToastContext";

  export default function AuthModal({ open, onClose }) {
    const { login, register } = useAuth();
    const { addToast } = useToast();

    const [mode, setMode] = useState("login"); // login | register
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });

    // Reset when opened
    useEffect(() => {
      if (open) {
        setForm({ name: "", email: "", password: "" });
        setMode("login");
        setIsOtpSent(false);
        setOtp("");
      }
    }, [open]);

    if (!open) return null;

    const switchMode = () => {
      setMode(mode === "login" ? "register" : "login");
      setForm({ name: "", email: "", password: "" });
      setIsOtpSent(false);
      setOtp("");
    };

    const handleSendOtp = async () => {
      if (!form.email || !form.name || !form.password) {
        addToast("Please fill in all details first", "error");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/send-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }),
    }
  );

        const data = await response.json();

        if (data.success) {
          setIsOtpSent(true);
          addToast("OTP sent to your email", "success");
        } else {
          addToast(data.message || "Failed to send OTP", "error");
        }
      } catch (error) {
        addToast("Failed to connect to server", "error");
      }
      setLoading(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (mode === "login") {
        setLoading(true);
        try {
          await login(form.email, form.password);
          addToast("Logged in successfully!", "success");
          onClose();
        } catch (err) {
          addToast(err?.message?.replace("Firebase:", "").trim() || "Authentication error", "error");
        }
        setLoading(false);
        return;
      }

      // REGISTER FLOW
      if (!isOtpSent) {
        handleSendOtp();
      } else {
        if (!otp) {
          addToast("Please enter the OTP", "error");
          return;
        }

        setIsVerifying(true);
        try {
          const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp }),
    }
  );

          const data = await response.json();

          if (data.success) {
            await register(form.email, form.password, form.name);
            addToast("Account created!", "success");
            onClose();
          } else {
            addToast(data.message || "Invalid OTP", "error");
          }
        } catch (error) {
          console.error("Registration Final Step Error:", error);
          const errorMsg = error?.message?.replace("Firebase:", "").trim() || "Registration failed";
          addToast(errorMsg, "error");
        }
        setIsVerifying(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">

        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl animate-fadeIn">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {mode === "login" ? "Login to Replateo" : "Create an Account"}
            </h2>

            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === "register" && (
              <input
                type="text"
                required
                disabled={isOtpSent}
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}

            <input
              type="email"
              required
              disabled={isOtpSent}
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              required
              disabled={isOtpSent}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {isOtpSent && mode === "register" && (
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <label className="block text-sm font-semibold text-orange-800 mb-2">
                  Enter verification code sent to your email
                </label>
                <input
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-orange-300 rounded focus:ring-2 focus:ring-orange-500"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="text-xs text-orange-600 mt-2 hover:underline"
                >
                  Change email address?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isVerifying}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 font-bold transition-all"
            >
              {loading ? "Sending Code..." : isVerifying ? "Verifying..." : mode === "login" ? "Login" : isOtpSent ? "Verify & Register" : "Send Verification Code"}
            </button>
          </form>

          {/* SWITCH MODE */}
          <p className="text-center text-sm mt-4">
            {mode === "login" ? "Don’t have an account?" : "Already have an account?"}

            <button
              className="text-orange-600 ml-1 font-semibold hover:underline"
              onClick={switchMode}
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>

        </div>
      </div>
    );
  }