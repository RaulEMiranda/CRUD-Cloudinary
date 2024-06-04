import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const tokenSuperUser = req.cookies.get("tokenSuperUser")?.value;
  const path = req.nextUrl.pathname;

  if (!tokenSuperUser && path === "/crud-login") {
    return NextResponse.next();
  }

  if (!tokenSuperUser && path.startsWith("/crud")) {
    return NextResponse.redirect(new URL("/crud-login", req.url));
  }

  if (tokenSuperUser && path === "/crud-login") {
    return NextResponse.redirect(new URL("/crud/productos", req.url));
  }

  if (tokenSuperUser) {
    const { payload } = await jwtVerify(
      tokenSuperUser,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/crud-login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crud/:path*", "/crud-login"],
};
