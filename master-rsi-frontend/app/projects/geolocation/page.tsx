"use client";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import L from "leaflet";

// Interface TypeScript
interface Etudiant {
  id: number;
  login: string;
  nom: string;
  note1: number;
  note2: number;
  moyenne: number;
  latitude: number;
  longitude: number;
}

// Icônes personnalisés
const greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Geolocation() {
  const [students, setStudents] = useState<Etudiant[]>([]);
  const [currentLogin, setCurrentLogin] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const user = localStorage.getItem("user");

        if (user) {
          const parsedUser = JSON.parse(user);
          setCurrentLogin(parsedUser.login);
        }

        const res = await fetch("http://localhost:8000/api/etudiants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des étudiants");
        }

        const data: Etudiant[] = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };

    fetchStudents();
  }, []);

  const center = useMemo(
    () =>
      students.length > 0
        ? [students[0].latitude, students[0].longitude]
        : [31.7917, -6.8498],
    [students]
  );

  return (
    <div>
      <main className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8 text-white bg-dark-blue p-4 rounded-lg text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          Géolocalisation
        </h1>
        <p className="mb-4">
          Carte Leaflet affichant les positions de géolocalisation des
          étudiants.
        </p>
        <div className="mb-6">
          <MapContainer
            center={center as [number, number]}
            zoom={6}
            style={{ width: "100%", height: "400px" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {students.map((student) => (
              <Marker
                key={student.id + "-" + student.login}
                position={[student.latitude, student.longitude]}
                icon={student.login === currentLogin ? greenIcon : blueIcon}
              >
                <Popup>
                  <strong>{student.nom}</strong>
                  <br />
                  Moyenne : {student.moyenne}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <Link href="/projects" className="text-blue-600 hover:underline">
          Retour aux projets
        </Link>
      </main>
    </div>
  );
}
