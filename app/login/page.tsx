"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginBackground } from "@/components/login/LoginBackground";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    setError("");
    try {
      await login(credentials);
      router.push("/dashboard");
    } catch (err) {
      setError("Credenciales inválidas. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a1259] via-[#5a1d79] to-[#3a1259] flex items-center justify-center p-4 relative">
      <LoginBackground />

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-[#7c96de] transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-10 backdrop-blur-lg">
          <LoginHeader />
          <LoginForm onSubmit={handleLogin} error={error} />

          <div className="mt-8 text-center border-t pt-6">
            <p className="text-sm text-gray-600">
              ¿Necesita ayuda?{" "}
              <a
                href="#"
                className="text-[#7c96de] hover:text-[#3a1259] font-semibold transition-colors"
              >
                Contacte al administrador
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-white text-sm mt-8 opacity-90">
          © {new Date().getFullYear()} NXT Legaltech. Sistema seguro y
          confiable.
        </p>
      </div>
    </div>
  );
}
