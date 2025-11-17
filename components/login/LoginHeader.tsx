import { Scale } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#3a1259] to-[#5a1d79] rounded-full mb-4 shadow-lg">
        <Scale className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-[#3a1259] mb-2">
        Sistema de Gestión Legal
      </h1>
      <p className="text-gray-600">
        Acceda a su cuenta para gestionar casos y clientes
      </p>
    </div>
  );
}
