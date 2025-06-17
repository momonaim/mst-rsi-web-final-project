"use client";

import { useState, useEffect, useCallback } from "react";
import Snackbar from "../../components/Snackbar";

interface Student {
  cne: string;
  nom: string;
  prenom: string;
  module1: number;
  module2: number;
  module3: number;
}

interface StudentsData {
  students: Student[];
}

export default function Formulaires() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cne, setCne] = useState("");
  const [notes, setNotes] = useState({
    module1: "0",
    module2: "0",
    module3: "0",
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [showList, setShowList] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const token = localStorage.getItem("access_token") || "";

  // Function to save data to the API
  const saveStudentsData = useCallback(
    async (studentsData: Student[]) => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/students/save-file",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ students: studentsData }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        setSnackbar({
          message: "Données enregistrées avec succès",
          type: "success",
        });
      } catch (error) {
        console.error("Error saving data:", error);
        setSnackbar({
          message: "Échec de l'enregistrement des données",
          type: "error",
        });
      }
    },
    [token]
  );

  // Function to load data from the API
  const loadStudentsData = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/students/load-file",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to load data");
      }
      const data: StudentsData = await response.json();
      setStudents(data.students || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setSnackbar({
        message: "Échec du chargement des données",
        type: "error",
      });
      setStudents([]);
    }
  }, [token]);

  // Load data when component mounts
  useEffect(() => {
    loadStudentsData();
  }, [loadStudentsData]);

  // Save data whenever students array changes
  useEffect(() => {
    if (students.length > 0) {
      saveStudentsData(students);
    }
  }, [students, saveStudentsData]);

  // Ajout ou modification d'un étudiant
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nom.trim() ||
      !prenom.trim() ||
      !cne.trim() ||
      notes.module1 === "" ||
      notes.module2 === "" ||
      notes.module3 === ""
    ) {
      setSnackbar({ message: "Tous les champs sont requis", type: "error" });
      return;
    }
    const newStudent = {
      cne,
      nom,
      prenom,
      module1: Number(notes.module1) || 0,
      module2: Number(notes.module2) || 0,
      module3: Number(notes.module3) || 0,
    };

    if (editIndex !== null) {
      // Modification
      const updatedStudents = students.map((student, idx) =>
        idx === editIndex ? newStudent : student
      );
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      // Ajout
      setStudents([...students, newStudent]);
    }

    // Réinitialiser les champs
    setNom("");
    setPrenom("");
    setCne("");
    setNotes({ module1: "", module2: "", module3: "" });
  };

  // Afficher la liste
  const handleConsult = () => {
    loadStudentsData();
    setShowList(true);
  };

  // Préparer la modification dans le formulaire principal
  const handleEdit = (index: number) => {
    const student = students[index];
    setNom(student.nom);
    setPrenom(student.prenom);
    setCne(student.cne);
    setNotes({
      module1: student.module1.toString(),
      module2: student.module2.toString(),
      module3: student.module3.toString(),
    });
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Annuler la modification
  const handleCancelEdit = () => {
    setEditIndex(null);
    setNom("");
    setPrenom("");
    setCne("");
    setNotes({ module1: "0", module2: "0", module3: "0" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white bg-dark-blue p-4 rounded-lg text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          Manipulation de formulaire avec les fichiers
        </h1>

        <div className="max-w-2xl mx-auto mb-8">
          <form
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
            onSubmit={handleSubmit}
          >
            <div className="bg-dark-blue text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-6">
              <h2 className="text-xl font-semibold">Gestion des Notes</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Colonne gauche - Informations personnelles */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Informations Personnelles
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        placeholder="Entrez le nom"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        placeholder="Entrez le prénom"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        CNE
                      </label>
                      <input
                        type="text"
                        value={cne}
                        onChange={(e) => setCne(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        placeholder="Code National Étudiant"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Notes des modules */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Notes des Modules
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Module 1
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={notes.module1 || "0"}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = Number(value);
                          if (
                            value === "" ||
                            (numValue >= 0 && numValue <= 20)
                          ) {
                            setNotes({ ...notes, module1: value || "0" });
                          }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Module 2
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={notes.module2 || "0"}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = Number(value);
                          if (
                            value === "" ||
                            (numValue >= 0 && numValue <= 20)
                          ) {
                            setNotes({ ...notes, module2: value || "0" });
                          }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Module 3
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={notes.module3 || "0"}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = Number(value);
                          if (
                            value === "" ||
                            (numValue >= 0 && numValue <= 20)
                          ) {
                            setNotes({ ...notes, module3: value || "0" });
                          }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent transition duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-dark-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-dark-blue-hover transform hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                {editIndex !== null
                  ? "Sauvegarder les Modifications"
                  : "Enregistrer l'Étudiant"}
              </button>
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                >
                  Annuler la Modification
                </button>
              )}
              <button
                type="button"
                onClick={handleConsult}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                Consulter la Liste
              </button>
            </div>
          </form>
        </div>

        {showList && students.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 overflow-x-auto">
              <div className="bg-dark-blue text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-6">
                <h2 className="text-xl font-semibold">Liste des Étudiants</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                      CNE
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                      Nom
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                      Prénom
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                      M1
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                      M2
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                      M3
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                      Moyenne
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const moyenne =
                      (student.module1 + student.module2 + student.module3) / 3;
                    const moyenneClass =
                      moyenne >= 10 ? "text-green-600" : "text-red-600";

                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 border-b text-gray-800">
                          {student.cne}
                        </td>
                        <td className="py-3 px-4 border-b text-gray-800">
                          {student.nom}
                        </td>
                        <td className="py-3 px-4 border-b text-gray-800">
                          {student.prenom}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-800">
                          {student.module1}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-800">
                          {student.module2}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-800">
                          {student.module3}
                        </td>
                        <td
                          className={`py-3 px-4 border-b text-center font-semibold ${moyenneClass}`}
                        >
                          {moyenne.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 border-b text-center">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-dark-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-blue-hover transform hover:scale-[1.05] transition-all duration-200 shadow-sm"
                          >
                            Modifier
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
