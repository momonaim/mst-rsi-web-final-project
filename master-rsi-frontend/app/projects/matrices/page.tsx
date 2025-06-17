"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import Link from "next/link";

export default function Matrices() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);

  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [sumResult, setSumResult] = useState<number[][] | null>(null);
  const [productResult, setProductResult] = useState<number[][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const generateRandomMatrix = (rows: number, cols: number) =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
    );

  const generateMatrices = () => {
    setMatrixA(generateRandomMatrix(rowsA, colsA));
    setMatrixB(generateRandomMatrix(rowsB, colsB));
    setSumResult(null);
    setProductResult(null);
    setError(null);
  };

  const calculateSum = () => {
    if (rowsA !== rowsB || colsA !== colsB) {
      setError(
        "Les dimensions des matrices doivent être identiques pour la somme."
      );
      setSumResult(null);
      return;
    }
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );
    setSumResult(result);
    setError(null);
  };

  const calculateProduct = () => {
    if (colsA !== rowsB) {
      setError(
        "Le nombre de colonnes de A doit être égal au nombre de lignes de B pour le produit."
      );
      setProductResult(null);
      return;
    }

    const result = Array.from({ length: rowsA }, () =>
      Array.from({ length: colsB }, () => 0)
    );

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    setProductResult(result);
    setError(null);
  };

  const formatMatrix = (matrix: number[][]) =>
    matrix.map((row) => row.join(" ")).join("\n");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      enqueueSnackbar("Texte copié dans le presse-papiers !", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-8 text-white bg-dark-blue p-4 rounded-lg text-center shadow-lg transform hover:scale-[1.01] transition-transform">
          Manipulation de Matrices
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">Dimensions Matrice A</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                value={rowsA}
                onChange={(e) => setRowsA(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Lignes A"
              />
              <input
                type="number"
                value={colsA}
                onChange={(e) => setColsA(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Colonnes A"
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Dimensions Matrice B</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                value={rowsB}
                onChange={(e) => setRowsB(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Lignes B"
              />
              <input
                type="number"
                value={colsB}
                onChange={(e) => setColsB(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Colonnes B"
              />
            </div>
          </div>
        </div>

        <button
          onClick={generateMatrices}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
        >
          Générer les matrices aléatoires
        </button>

        {matrixA.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">Matrice A</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {formatMatrix(matrixA)}
            </pre>
          </div>
        )}

        {matrixB.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">Matrice B</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {formatMatrix(matrixB)}
            </pre>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={calculateSum}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
          >
            Calculer la somme
          </button>
          <button
            onClick={calculateProduct}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
          >
            Calculer le produit
          </button>
        </div>

        {error && <p className="text-red-600 font-medium">{error}</p>}

        {sumResult && (
          <div>
            <h2 className="font-semibold text-lg">Résultat de la somme</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-2">
              {formatMatrix(sumResult)}
            </pre>
            <button
              onClick={() => copyToClipboard(formatMatrix(sumResult))}
              className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Copier le texte
            </button>
          </div>
        )}

        {productResult && (
          <div>
            <h2 className="font-semibold text-lg">Résultat du produit</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-2">
              {formatMatrix(productResult)}
            </pre>
            <button
              onClick={() => copyToClipboard(formatMatrix(productResult))}
              className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Copier le texte
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <Link href="/projects" className="text-blue-600 hover:underline">
            ← Retour aux projets
          </Link>
        </div>
      </div>
    </div>
  );
}
