import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#3a1259] to-[#5a1d79] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-6">Gestión Legal Profesional</h2>
          <p className="text-xl mb-8 text-gray-200">
            Sistema integral para la gestión de casos legales. Organiza,
            gestiona y controla todos tus casos de manera eficiente y
            profesional.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#7c96de] hover:bg-[#6a84cc] text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Comenzar Ahora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="hidden md:flex justify-center">
          <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Scale className="w-40 h-40 text-[#7c96de]" />
          </div>
        </div>
      </div>
    </section>
  );
}
