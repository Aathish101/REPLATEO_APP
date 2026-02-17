import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { auth } from "../firebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [mode, setMode] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const m = params.get("mode");
    const code = params.get("oobCode");
    setMode(m);
    setOobCode(code);

    if (m !== "resetPassword" || !code) return;

    // Verify the code and get the email associated with it
    (async () => {
      try {
        const emailFromCode = await verifyPasswordResetCode(auth, code);
        setEmail(emailFromCode);
      } catch (err) {
        console.error("Invalid or expired reset code", err);
        addToast("Invalid or expired reset link", "error");
      }
    })();
  }, [location.search, addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oobCode) return addToast("Missing reset code", "error");
    if (newPassword.length < 6) return addToast("Password must be at least 6 characters", "error");

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      addToast("Password has been reset. You can now log in.", "success");
      navigate("/auth");
    } catch (err) {
      console.error("Error confirming password reset", err);
      addToast(err.message || "Failed to reset password", "error");
    }
    setLoading(false);
  };

  if (mode !== "resetPassword") {
    return (
      <section className="page-section">
        <div className="page-container flex justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">Invalid password reset link</h2>
            <p className="mt-2 text-gray-500">The link you used is not a password reset link.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-container flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Set a new password</h2>

          {email && (
            <p className="text-sm text-gray-600 text-center mb-4">Resetting password for <strong>{email}</strong></p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 font-semibold"
            >
              {loading ? "Setting password..." : "Set new password"}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/auth" className="text-orange-600 hover:underline">Back to Login</a>
          </div>
        </div>
      </div>
    </section>
  );
}
