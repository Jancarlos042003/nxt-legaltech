"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <header className="bg-[#3a1259] text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <h1 className="text-2xl font-bold">NXT Legaltech</h1>
        </Link>
        <nav className="flex gap-6">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hover:text-[#7c96de] transition-colors font-medium cursor-pointer"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="hover:text-[#7c96de] transition-colors font-medium cursor-pointer"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
