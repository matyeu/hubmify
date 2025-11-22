import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const maintenanceModeRaw = process.env.MAINTENANCE_MODE;
  const isMaintenance =
    maintenanceModeRaw?.toLowerCase().trim() === "true" ||
    maintenanceModeRaw?.toLowerCase().trim() === "1";

  // Exclure les fichiers statiques
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/css") ||
    pathname.startsWith("/preview_video.webm") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  if (isMaintenance && !pathname.startsWith("/maintenance")) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (!isMaintenance && pathname.startsWith("/maintenance")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
