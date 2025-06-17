import Link from "next/link";
import Image from "next/image";

export default function Quiz() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white bg-dark-blue p-4 rounded-lg text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          Quiz Interactifs
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Testez vos connaissances en programmation avec nos quiz interactifs.
          Choisissez votre langage et relevez le défi !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link
            href="/projects/quiz/javascript"
            className="transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative h-48">
                <Image
                  src="/javascript.gif"
                  alt="Quiz JavaScript"
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Quiz JavaScript
                </h2>
                <p className="text-gray-600">
                  Testez vos compétences en JavaScript à travers une série de
                  questions stimulantes.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/projects/quiz/php"
            className="transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative h-48">
                <Image
                  src="/php.gif"
                  alt="Quiz PHP"
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Quiz PHP
                </h2>
                <p className="text-gray-600">
                  Évaluez votre maîtrise de PHP avec des questions adaptées à
                  tous les niveaux.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 space-x-1 font-medium"
          >
            <span>←</span>
            <span>Retour aux projets</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
