import Link from "next/link";

export function Header() {
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
          <Link
            href="/login"
            className="hover:text-[#7c96de] transition-colors font-medium"
          >
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}
