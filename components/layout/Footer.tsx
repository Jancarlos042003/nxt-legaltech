export function Footer() {
  return (
    <footer className="bg-[#3a1259] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-300">
          © {new Date().getFullYear()} NXT Legaltech. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
