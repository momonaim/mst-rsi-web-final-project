import Link from "next/link";

export default function Quiz() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Page des Quiz</h1>
      <p className="text-lg text-center mb-6">
        Sélectionnez un quiz pour tester vos connaissances.
      </p>

      <div className="flex gap-10 mb-8">
        <Link href="/projects/quiz/javascript">
          <div className="cursor-pointer text-center">
            <img
              src="/javascript.gif"
              alt="Quiz JavaScript"
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 font-semibold">Quiz JavaScript</p>
          </div>
        </Link>
        <Link href="/projects/quiz/php">
          <div className="cursor-pointer text-center">
            <img
              src="/php.gif"
              alt="Quiz PHP"
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 font-semibold">Quiz PHP</p>
          </div>
        </Link>
      </div>

      <Link href="/projects" className="text-blue-600 hover:underline text-sm">
        ← Retour aux projets
      </Link>
    </main>
  );
}
