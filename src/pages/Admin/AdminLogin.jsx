import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      // ✅ Firebase handles session automatically
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
