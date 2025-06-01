"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import { FiUser, FiBook, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import UpdateProfileForm from "./components/UpdateProfileForm";
import { Student } from "./types/student";

export default function Home() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    // Appel à l’API pour récupérer les infos de l’étudiant connecté
    const fetchStudent = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          router.replace("/login");
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        const studentId = parsedUser.etudiant?.id || parsedUser.id;
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `http://localhost:8000/api/etudiants/${studentId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();
        setStudent(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'étudiant:", error);
        router.replace("/login");
      }
    };

    fetchStudent();
  }, [isLoggedIn, loading, router]);

  if (loading || !isLoggedIn || !student) {
    return <LoadingSpinner />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleUpdateProfile = () => {
    setShowUpdateProfile(true);
  };

  const handleProfileUpdate = (updatedStudent: Student) => {
    setStudent(updatedStudent);
    localStorage.setItem("user", JSON.stringify(updatedStudent));
  };

  const handleViewCourses = () => {
    alert("Cette action n'est pas encore implémentée");
  };

  const handleRecordLocation = async () => {
    if (!student) return;

    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/etudiants/${student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      alert("Position enregistrée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la position:", error);
      alert("Erreur lors de l'enregistrement de la position");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Bienvenue, {student.nom} !
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <FiUser size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Profil</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium">Identifiant:</span>{" "}
                {student.login}
              </p>
              <p>
                <span className="font-medium">Nom complet:</span> {student.nom}
              </p>
              <p>
                <span className="font-medium">ID étudiant:</span> {student.id}
              </p>
            </div>
          </div>

          {/* Grades Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                <FiBook size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium">Note 1:</span> {student.note1}/20
              </p>
              <p>
                <span className="font-medium">Note 2:</span> {student.note2}/20
              </p>
              <div className="pt-2">
                <p className="font-medium text-lg">
                  <span className="text-gray-800">Moyenne:</span>
                  <span
                    className={`ml-2 ${
                      student.moyenne >= 10 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {student.moyenne}/20
                  </span>
                </p>
                {student.moyenne > 0 && (
                  <p className="text-sm mt-1">
                    {student.moyenne >= 10 ? "✅ Validé" : "❌ Non validé"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <FiMapPin size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Localisation
              </h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium">Latitude:</span>{" "}
                {student.latitude}
              </p>
              <p>
                <span className="font-medium">Longitude:</span>{" "}
                {student.longitude}
              </p>
              {student.latitude !== 0 && student.longitude !== 0 ? (
                <a
                  href={`https://www.google.com/maps?q=${student.latitude},${student.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                >
                  Voir sur la carte
                </a>
              ) : (
                <p className="text-sm text-gray-500">
                  Localisation non enregistrée
                </p>
              )}
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                <FiCalendar size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Compte</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-medium">Créé le:</span>{" "}
                {formatDate(student.created_at)}
              </p>
              <p>
                <span className="font-medium">Dernière mise à jour:</span>{" "}
                {formatDate(student.updated_at)}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <FiClock size={16} />
                Connecté maintenant
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Actions rapides
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Mettre à jour mon profil
            </button>
            <button
              onClick={handleViewCourses}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Voir mes cours
            </button>
            <button
              onClick={handleRecordLocation}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Enregistrer ma position
            </button>
          </div>
        </div>
      </main>

      {showUpdateProfile && (
        <UpdateProfileForm
          student={student!}
          onClose={() => setShowUpdateProfile(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}
