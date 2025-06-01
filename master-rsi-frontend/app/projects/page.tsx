import Link from "next/link";

export default function Projects() {
  const projects = [
    { name: "➗ Matrices Manipulation", path: "/projects/matrices" },
    { name: "📝 Form Handling", path: "/projects/formulaires" },
    { name: "🖼️ Image Management", path: "/projects/images" },
    { name: "❓ Quiz", path: "/projects/quiz" },
    { name: "📊 Statistics with ChartJS", path: "/projects/statistics" },
    { name: "📍 Geolocation", path: "/projects/geolocation" },
  ];

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          🚀 Mes Projets
        </h1>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.path}
              className="block p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition hover:bg-blue-50"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-blue-600">Voir le projet</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
