"use client";

import { useState, useEffect } from "react";

export default function Formulaires() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cne, setCne] = useState("");
  const [notes, setNotes] = useState({ module1: "", module2: "", module3: "" });
  interface Student {
    cne: string;
    nom: string;
    prenom: string;
    module1: string;
    module2: string;
    module3: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [showList, setShowList] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Charger les données existantes depuis localStorage au montage
  useEffect(() => {
    const data = localStorage.getItem("students_rsi2025");
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("students_rsi2025", JSON.stringify(students));
  }, [students]);

  // Charger les données (depuis localStorage)
  const loadStudents = () => {
    const data = localStorage.getItem("students_rsi2025");
    if (data) {
      setStudents(JSON.parse(data));
    }
  };

  // Ajout ou modification d'un étudiant
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nom.trim() ||
      !prenom.trim() ||
      !cne.trim() ||
      !notes.module1.trim() ||
      !notes.module2.trim() ||
      !notes.module3.trim()
    ) {
      alert("Tous les champs sont requis.");
      return;
    }
    const newStudent = {
      cne,
      nom,
      prenom,
      module1: notes.module1,
      module2: notes.module2,
      module3: notes.module3,
    };

    if (editIndex !== null) {
      // Modification
      setStudents((prev) =>
        prev.map((student, idx) => (idx === editIndex ? newStudent : student))
      );
      setEditIndex(null);
    } else {
      // Ajout
      setStudents((prev) => [...prev, newStudent]);
    }

    // Réinitialiser les champs
    setNom("");
    setPrenom("");
    setCne("");
    setNotes({ module1: "", module2: "", module3: "" });
  };

  // Afficher la liste
  const handleConsult = () => {
    loadStudents();
    setShowList(true);
  };

  // Préparer la modification dans le formulaire principal
  const handleEdit = (index: number) => {
    const student = students[index];
    setNom(student.nom);
    setPrenom(student.prenom);
    setCne(student.cne);
    setNotes({
      module1: student.module1,
      module2: student.module2,
      module3: student.module3,
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
    setNotes({ module1: "", module2: "", module3: "" });
  };

  return (
    <div>
      <main className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-white bg-blue-900 p-2 rounded">
          Gestion de formulaire avec les fichiers
        </h1>
        <form
          className="max-w-md mx-auto bg-blue-700 p-4 rounded shadow-lg text-white"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-2">1. Informations</h2>
          <div className="mb-4">
            <label className="block mb-1">Nom :</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Nom"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Prénom :</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Prénom"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">CNE :</label>
            <input
              type="text"
              value={cne}
              onChange={(e) => setCne(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Code national étudiant"
              required
            />
          </div>

          <h2 className="text-xl font-semibold mb-2">2. Notes des modules</h2>
          <div className="mb-4">
            <label className="block mb-1">Module 1 :</label>
            <input
              type="number"
              value={notes.module1}
              onChange={(e) => setNotes({ ...notes, module1: e.target.value })}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Note"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Module 2 :</label>
            <input
              type="number"
              value={notes.module2}
              onChange={(e) => setNotes({ ...notes, module2: e.target.value })}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Note"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Module 3 :</label>
            <input
              type="number"
              value={notes.module3}
              onChange={(e) => setNotes({ ...notes, module3: e.target.value })}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Note"
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-2"
            >
              {editIndex !== null ? "Sauvegarder" : "Valider"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mb-2"
              >
                Annuler
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleConsult}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Consulter liste
          </button>
        </form>

        {showList && students.length > 0 && (
          <div className="max-w-2xl mx-auto mt-4 bg-blue-700 p-4 rounded shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">
              Liste des étudiants enregistrés
            </h2>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="border p-2">CNE</th>
                  <th className="border p-2">Nom</th>
                  <th className="border p-2">Prénom</th>
                  <th className="border p-2">Module 1</th>
                  <th className="border p-2">Module 2</th>
                  <th className="border p-2">Module 3</th>
                  <th className="border p-2">Modifier</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border p-2">{student.cne}</td>
                    <td className="border p-2">{student.nom}</td>
                    <td className="border p-2">{student.prenom}</td>
                    <td className="border p-2">{student.module1}</td>
                    <td className="border p-2">{student.module2}</td>
                    <td className="border p-2">{student.module3}</td>
                    <td className="border p-2">
                      <button
                        className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(index)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
