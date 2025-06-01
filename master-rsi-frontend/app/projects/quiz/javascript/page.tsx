"use client";
import { useState } from "react";

export default function JavaScriptQuiz() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "", q4: "" });
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setScore(null);

    // Vérifier si toutes les questions ont une réponse
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4) {
      setError("Veuillez répondre à toutes les questions");
      setIsLoading(false);
      return;
    }

    // Réponses correctes
    const correctAnswers = {
      q1: "script",
      q2: "src",
      q3: "alert",
      q4: "function myFunction()",
    };

    // Calcul du score
    let calculatedScore = 0;
    Object.entries(correctAnswers).forEach(([key, value]) => {
      if (answers[key as keyof typeof answers] === value) {
        calculatedScore += 5;
      }
    });

    setScore(calculatedScore / 5);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch("http://localhost:8000/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ quiz: "javascript", score: calculatedScore }),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }
      const data = await response.json();
      setSuccessMessage(data.message || "Quiz soumis avec succès !");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch {
      setError(
        "Une erreur est survenue lors de la soumission. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz JavaScript</h2>

      <form className="space-y-8">
        {/* Question 1 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="font-medium mb-4">
            1. Dans quel élément HTML place-t-on le code JavaScript ?
          </p>
          {["script", "js", "body", "link"].map((opt) => (
            <label
              key={opt}
              className="block mb-2 hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="q1"
                value={opt}
                checked={answers.q1 === opt}
                onChange={handleChange}
                className="mr-2"
              />
              {`<${opt}>`}
            </label>
          ))}
        </div>

        {/* Question 2 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="font-medium mb-4">
            2. Quel attribut utilise-t-on pour référencer un fichier JavaScript
            externe ?
          </p>
          {["src", "rel", "type", "href"].map((opt) => (
            <label
              key={opt}
              className="block mb-2 hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="q2"
                value={opt}
                checked={answers.q2 === opt}
                onChange={handleChange}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Question 3 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="font-medium mb-4">
            3. Quelle méthode affiche une boîte de dialogue avec le message
            &ldquo;Hello&rdquo; ?
          </p>
          {["msg", "alertbox", "document.write", "alert"].map((opt) => (
            <label
              key={opt}
              className="block mb-2 hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="q3"
                value={opt}
                checked={answers.q3 === opt}
                onChange={handleChange}
                className="mr-2"
              />
              {`${opt}("Hello")`}
            </label>
          ))}
        </div>

        {/* Question 4 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="font-medium mb-4">
            4. Quelle est la bonne syntaxe pour créer une fonction en JavaScript
            ?
          </p>
          {[
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()",
            "create.myFunction()",
          ].map((opt) => (
            <label
              key={opt}
              className="block mb-2 hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="q4"
                value={opt}
                checked={answers.q4 === opt}
                onChange={handleChange}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Erreur */}
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded mb-4">
            {error}
          </div>
        )}

        {/* Score */}
        {score !== null && (
          <div className="text-center p-4 bg-green-100 rounded mb-4 font-medium">
            Votre score : {score * 5}/20
            <p className="text-sm mt-2">
              {score === 4
                ? "Parfait !"
                : score === 3
                ? "Très bien !"
                : score === 2
                ? "Pas mal, continuez !"
                : "Besoin de réviser un peu..."}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded 
          ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} 
          transition-colors`}
        >
          {isLoading ? "Chargement..." : "Valider mes réponses"}
        </button>
      </form>
      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-slide-up">
          {successMessage}
        </div>
      )}
    </div>
  );
}
