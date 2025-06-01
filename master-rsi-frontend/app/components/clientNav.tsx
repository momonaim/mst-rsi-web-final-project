"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function ClientNav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="mt-2">
      <Link href="/" className="text-blue-300 hover:underline mx-2">
        Accueil
      </Link>
      <Link href="/about" className="text-blue-300 hover:underline mx-2">
        About Me
      </Link>
      <Link href="/projects" className="text-blue-300 hover:underline mx-2">
        Mes Projets
      </Link>
      {isLoggedIn ? (
        <button onClick={logout} className="text-blue-300 hover:underline mx-2">
          Déconnexion
        </button>
      ) : (
        <Link href="/login" className="text-blue-300 hover:underline mx-2">
          Connexion
        </Link>
      )}
    </nav>
  );
}
