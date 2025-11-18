import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    console.error(
      "❌ CRÍTICO: No se encontró JWT_SECRET_KEY en variables de entorno"
    );
    throw new Error("Falta la clave secreta de JWT");
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // DEBUG: Ver si llega el token
  if (!token) {
    console.log("⚠️ Middleware: No se encontró cookie 'token'. Redirigiendo.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    console.log("ℹ️ Middleware: Token encontrado, intentando verificar...");
    await jwtVerify(token, getSecretKey());
    console.log("✅ Middleware: Token válido. Acceso permitido.");
    return NextResponse.next();
  } catch (e: any) {
    // DEBUG: Ver por qué falla la verificación
    console.error("⛔ Middleware: Falló la verificación del token:", e.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
