// middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  // Rutas públicas para usuarios no autenticados
  const publicRoutes = ["/iniciar-sesion", "/registro"];

  // Principal
  if (token && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/all";
    return NextResponse.redirect(url);
  }
  
  if (!token && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/iniciar-sesion";
    return NextResponse.redirect(url);
  }

  // Si el usuario está autenticado y trata de acceder a rutas públicas, se redirecciona al dashboard
  if (token && publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/all";
    return NextResponse.redirect(url);
  }

  // Si el usuario NO está autenticado y trata de acceder al dashboard, se redirecciona a la página principal o login
  if (!token && pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/iniciar-sesion";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuración para definir en qué rutas se ejecuta el middleware
export const config = {
  matcher: ["/", "/iniciar-sesion", "/registro", "/dashboard/:path*"],
};
