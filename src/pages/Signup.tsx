import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import GoogleLoginButton from "../components/GoogleLoginButton";
import EmailLogin from "../components/EmailLogin";
import { logout } from "../auth/logout";


const Signup: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);



  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">

        {user ? (
          /* LOGGED IN */
          <div className="space-y-4 text-center">
            <p className="text-gray-700">
              Logged in as
              <br />
              <span className="font-semibold">{user.email}</span>
            </p>

            <button
              onClick={logout}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Log out
            </button>
          </div>
        ) : (
          /* NOT LOGGED IN */
          <>
            {/* Toggle */}
            <div className="space-y-4">

              <p className="text-gray-600 text-sm text-center">
                {mode === "login"
                  ? "Log in to access the 3D model and features"
                  : "Create an account to get started"}
              </p>
            </div>

            {/* Providers */}
            <div className="space-y-6">

  {/* Title */}
  <h2 className="text-2xl font-semibold text-center">
    {mode === "login" ? "Log in" : "Sign up"}
  </h2>

  {/* Google */}
  <div className="border rounded-xl px-4 py-3 hover:bg-gray-50 transition text-center cursor-pointer">
    <GoogleLoginButton />
  </div>

  {/* Divider */}
  <div className="flex items-center gap-3 text-gray-400 text-sm">
    <div className="flex-1 h-px bg-gray-300" />
    or continue with email
    <div className="flex-1 h-px bg-gray-300" />
  </div>

  {/* Email box */}
  <div className="border rounded-xl p-4 space-y-3">

  {error && (
    <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
      {error}
    </div>
  )}

  <EmailLogin mode={mode} setError={setError} setMode={setMode} />

  {mode === "login" && (
    <p className="text-sm text-center text-gray-600">
      Don’t have an account?{" "}
      <button
        onClick={() => {
          setMode("signup");
          setError(null);
        }}
        className="font-medium hover:underline"
      >
        Create one
      </button>
    </p>
  )}

</div>


</div>

          </>
        )}

      </div>
    </div>
  );
};

export default Signup;





