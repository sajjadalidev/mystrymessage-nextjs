import { NextResponse, NextRequest } from "next/server";
import {default} from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const isAuth = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
    const url = request.nextUrl;
  // if (
  //   isAuth && (url.pathname.startsWith("/sign-in")
  //   || url.pathname.startsWith("/sign-up")
  //   || url.pathname.startsWith("/verify") ||
  //   url.pathname ==="/")
  // ) {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }   
    if(!isAuth && url.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next()
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};
