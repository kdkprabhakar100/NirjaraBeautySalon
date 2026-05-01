import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@nirjara.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.admin.email);

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Server error. Please make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF5F8] px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"
      >
        <h1 className="text-center font-serif text-4xl text-[#E75480]">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-[#8A6F78]">
          Access Nirjara dashboard
        </p>

        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-full bg-[#E75480] py-4 text-xs uppercase tracking-[2px] text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-sm text-[#8A6F78] hover:text-[#E75480]"
          >
            Back to website
          </button>
        </div>
      </form>
    </main>
  );
}