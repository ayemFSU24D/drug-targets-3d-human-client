import { useState } from "react";
import { login, register } from "../auth/emailAuth";

const EmailLogin = ({
  mode,
  setError,
  setMode,
}: {
  mode: "login" | "signup";
  setError: (v: string | null) => void;
  setMode: (m: "login" | "signup") => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      setError(null);

      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Account not found. Create one instead.");
        setMode("signup");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded px-3 py-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
      >
        {mode === "login" ? "Log in" : "Create account"}
      </button>
    </div>
  );
};

export default EmailLogin;
