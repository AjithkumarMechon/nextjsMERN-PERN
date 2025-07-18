import { queryClient } from "@/tanstack/store/ReactQueryProvider";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This runs on the server, so we can't access window here
// If you need to make queryClient available on the client, do it in a client component

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Example: Redirect to login if not authenticated
  const isLoggedIn = request.cookies.get("token");
  if (!isLoggedIn && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Match only specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Apply middleware only to these paths
};
