import ClientLayout from "./ClientLayout";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Master RSI - Projet Web",
  description: "Application web pour le projet Master RSI 2024-2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <div className={`${inter.className} flex-1`}>
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
