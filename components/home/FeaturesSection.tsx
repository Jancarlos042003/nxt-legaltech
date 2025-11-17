import { FileText, Users, Shield } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#3a1259]">
          Nuestras Soluciones
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Herramientas diseñadas para profesionales del derecho
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="w-12 h-12" />}
            title="Gestión de Casos"
            description="Administra todos tus casos legales en un solo lugar. Seguimiento completo desde inicio hasta cierre."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Gestión de Clientes"
            description="Base de datos completa de clientes con historial de casos y documentación asociada."
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12" />}
            title="Seguridad Garantizada"
            description="Protección de datos con encriptación de nivel empresarial y cumplimiento legal."
          />
        </div>
      </div>
    </section>
  );
}
