"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingSpinner from "@/app/components/LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Etudiant {
  id: number;
  login: string;
  nom: string;
  note1: number;
  note2: number;
  moyenne: number;
  longitude: number;
  latitude: number;
}

export default function Statistics() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [currentLogin, setCurrentLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const userStr = localStorage.getItem("user");

        if (userStr) {
          const parsedUser = JSON.parse(userStr);
          const login = parsedUser.login || parsedUser.etudiant?.login;
          setCurrentLogin(login);
        }

        const res = await fetch("http://localhost:8000/api/etudiants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Échec du chargement des étudiants");

        const data = await res.json();

        setEtudiants(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  if (loading) return <LoadingSpinner />;

  const colors = etudiants.map((e) =>
    e.login === currentLogin
      ? "rgba(75, 192, 192, 0.7)"
      : "rgba(54, 162, 235, 0.7)"
  );
  const borderColors = etudiants.map((e) =>
    e.login === currentLogin ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)"
  );

  const chartData = {
    labels: etudiants.map((e) => e.nom),
    datasets: [
      {
        label: "Moyenne",
        data: etudiants.map((e) => e.moyenne),
        backgroundColor: colors,
        borderColor: borderColors,
        hoverBackgroundColor: "rgba(222, 222, 222, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Moyenne des étudiants" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
      },
    },
  };

  return (
    <div>
      <main className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8 text-white bg-dark-blue p-4 rounded-lg text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          Statistiques avec ChartJS
        </h1>
        <p className="mb-4">
          Cette page affiche la moyenne de chaque étudiant avec ChartJS.
        </p>
        <div className="mb-6 bg-white p-4 rounded shadow">
          <Bar data={chartData} options={options} height={100} />
        </div>
        <Link href="/projects" className="text-blue-600 hover:underline">
          Retour aux projets
        </Link>
      </main>
    </div>
  );
}
