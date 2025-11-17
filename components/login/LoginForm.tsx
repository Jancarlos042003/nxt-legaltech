"use client";

import { useState } from "react";
import { Lock, User } from "lucide-react";
import { LoginFormInput } from "./LoginFormInput";
import { LoginButton } from "./LoginButton";
import { LoginRequest } from "@/types/auth";

interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => Promise<void>;
  error: string;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LoginFormInput
        id="username"
        label="Usuario"
        type="text"
        value={username}
        onChange={setUsername}
        placeholder="Ingrese su usuario"
        icon={<User className="h-5 w-5 text-gray-400" />}
        disabled={loading}
      />

      <LoginFormInput
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Ingrese su contraseña"
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        disabled={loading}
      />

      <LoginButton loading={loading} />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}
    </form>
  );
}
