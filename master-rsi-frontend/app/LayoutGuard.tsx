import React from "react";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "./components/LoadingSpinner";

export function LayoutGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = React.useMemo(
    () => ["/login", "/register", "/about", "/projects"],
    []
  );

  useEffect(() => {
    if (!loading && !isLoggedIn && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, pathname, router, publicRoutes]);

  if (loading || (!isLoggedIn && !publicRoutes.includes(pathname))) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
