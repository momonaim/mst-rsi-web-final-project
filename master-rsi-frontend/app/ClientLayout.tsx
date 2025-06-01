"use client";

import { usePathname } from "next/navigation";
import ClientNav from "./components/clientNav";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import Sidebar from "./components/Sidebar";
import { LayoutGuard } from "./LayoutGuard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <AuthProvider>
        <LayoutGuard>
          <header className="bg-gray-800 text-white text-center">
            <ClientNav />
          </header>
          <div className="flex flex-1">
            {hideLayout ? null : <Sidebar />}
            <main className="flex-1 p-4">{children}</main>
          </div>
          <footer className="bg-gray-800 mt-0 text-white text-center">
            <p>MST-RSI : Abdelmounim MOUADILI &copy; 2024-2025</p>
          </footer>
        </LayoutGuard>
      </AuthProvider>
    </SnackbarProvider>
  );
}
