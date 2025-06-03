// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();

//   // Example: Redirect to login if not authenticated
//   const isLoggedIn = request.cookies.get("token");
//   if (!isLoggedIn && url.pathname !== "/login") {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // Match only specific paths
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"], // Apply middleware only to these paths
// };
