import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = Buffer.from(process.env.JWT_SECRET, "base64");

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Middleware function
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token.value);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = payload.role;

  // restricted routes for each role
  const adminRestrictedUrls = ["/dashboard/all-cart"];
  const customerRestrictedUrls = [
    "/dashboard/add-category",
    "/dashboard/add-product",
    "/dashboard/add-users",
    "/dashboard/all-categories",
    "/dashboard/all-contacts",
    "/dashboard/all-product-request",
    "/dashboard/all-users",
    "/dashboard/create-post",
    "/dashboard/edit-category",
    "/dashboard/edit-post",
    "/dashboard/posts",
    "/dashboard/update-product",
  ];

  if (userRole === "Customer") {
    const isRestricted = customerRestrictedUrls.some((url) =>
      request.nextUrl.pathname.startsWith(url)
    );
    if (isRestricted) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (userRole === "Admin") {
    const isRestricted = adminRestrictedUrls.some((url) =>
      request.nextUrl.pathname.startsWith(url)
    );
    if (isRestricted) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
