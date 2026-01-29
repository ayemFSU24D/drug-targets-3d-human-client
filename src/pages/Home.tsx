import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import heroImage from "../assets/Hero.png";


export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

    {/* HERO */}
    <section className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">

      <div>
        <h1 className="text-5xl font-bold leading-tight">
          Visualize how drugs affect the human body in real time
        </h1>

        <p className="mt-6 text-slate-300 text-lg max-w-xl">
          An interactive platform where you can observe drug effects on a 3D human body model — fast and scientifically accurate.
        </p>

        <div className="mt-10 flex gap-4">

          {user ? (
            <NavLink
              to="/ModelPage"
              className="bg-indigo-600 hover:bg-indigo-500 transition px-7 py-3 rounded-xl font-semibold shadow-lg"
            >
              Explore the 3D Model
            </NavLink>
          ) : (
            <NavLink
              to="/Signup"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Log in to use the service
            </NavLink>
          )}

          <button className="border border-white/20 px-7 py-3 rounded-xl hover:bg-white/5 transition">
            Learn more
          </button>
        </div>
      </div>

      {/* MOCKUP */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="h-80 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 flex items-center justify-center text-slate-300">

          <img 
            src={heroImage} 
            alt="3D human model" 
            className="w-full max-w-md rounded-2xl"
          />

        </div>
      </div>

    </section>

    {/* FEATURES */}
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">

      <div className="glass-card">
        <h3 className="text-xl font-semibold">3D-based visualization</h3>
        <p className="mt-3 text-slate-400">
          See exactly which organs and systems are affected.
        </p>
      </div>

      <div className="glass-card">
        <h3 className="text-xl font-semibold">Real-time data</h3>
        <p className="mt-3 text-slate-400">
          Medical effects and interactions are updated live.
        </p>
      </div>

      <div className="glass-card">
        <h3 className="text-xl font-semibold">Clear analysis</h3>
        <p className="mt-3 text-slate-400">
          Perfect for students, doctors, and research.
        </p>
      </div>

    </section>

    {/* HOW IT WORKS */}
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">

      <h2 className="text-4xl font-bold">How it works</h2>

      <div className="mt-16 grid md:grid-cols-3 gap-12 text-left">

        <div className="step-card">
          <span className="step-number">01</span>
          <h4>Select a drug</h4>
          <p>Search or choose from the database.</p>
        </div>

        <div className="step-card">
          <span className="step-number">02</span>
          <h4>Analyze effects</h4>
          <p>Body systems are visually highlighted.</p>
        </div>

        <div className="step-card">
          <span className="step-number">03</span>
          <h4>Understand relationships</h4>
          <p>Side effects and impacts become clear.</p>
        </div>

      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-28">

      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-20 text-center shadow-2xl">

        <h2 className="text-4xl font-bold">
          Ready to experience the future of drug analysis?
        </h2>

        <p className="mt-4 text-white/80 text-lg">
          Start using the platform today.
        </p>

        <button className="mt-10 bg-black/80 hover:bg-black px-10 py-4 rounded-xl font-semibold transition">
          Get started
        </button>

      </div>

    </section>

    <footer className="text-center text-slate-500 py-12">
      © 2026 Medical Visualization Platform
    </footer>

  </div>
);
}
