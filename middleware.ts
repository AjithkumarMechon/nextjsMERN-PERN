// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();

//   // Example condition: if path is "/forbidden"
//   if (url.pathname === "/") {
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   // Proceed normally
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
