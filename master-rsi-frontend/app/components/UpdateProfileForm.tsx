"use client";
import { useState } from "react";
import { Student } from "../types/student";
import Snackbar from "./Snackbar";

interface UpdateProfileFormProps {
  student: Student;
  onClose: () => void;
  onUpdate: (updatedStudent: Student) => void;
}

export default function UpdateProfileForm({
  student,
  onClose,
  onUpdate,
}: UpdateProfileFormProps) {
  const [nom, setNom] = useState(student.nom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/etudiants/${student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nom }),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const updatedStudent = await response.json();
      onUpdate(updatedStudent);
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        setShowSuccessSnackbar(false);
        onClose();
      }, 2000);
    } catch {
      setError("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Mettre à jour le profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Mise à jour..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
      {showSuccessSnackbar && (
        <Snackbar
          message="Profil mis à jour avec succès !"
          type="success"
          onClose={() => setShowSuccessSnackbar(false)}
        />
      )}
      {error && (
        <Snackbar message={error} type="error" onClose={() => setError("")} />
      )}
    </div>
  );
}
