"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [nom, setNom] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        nom,
        login,
        pass,
        pass_confirmation: passConfirmation,
      });

      // Stocker l'utilisateur et le token (modifie selon ton backend)

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // Rediriger vers le l'accueil
      router.push("/");
    } catch (err) {
      console.error(err);
      let message = "Une erreur est survenue.";
      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.message ||
          err.response?.data?.errors?.[0] ||
          "Une erreur est survenue.";
      }
      setError(message);
      console.error("Erreur de connexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Inscription
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Créez votre compte maintenant
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom complet"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              />
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              />
              <input
                type="password"
                value={passConfirmation}
                onChange={(e) => setPassConfirmation(e.target.value)}
                placeholder="Confirmation du mot de passe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition-all ${
                  isLoading && "opacity-70 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Inscription..." : "S'inscrire"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center">
              Vous avez déjà un compte ?{" "}
              <a href="/login" className="text-green-600 hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
