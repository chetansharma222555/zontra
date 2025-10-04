import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;
  
  // Protect /admin routes
  if (url.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    try {
       const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

      await jwtVerify(token, secret); // ✅ Edge-friendly verification
      return NextResponse.next(); // allow access
    } catch (err) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
