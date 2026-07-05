import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ['/checkout', '/profile', '/admin']  // ← /admin add kiya
const AUTH_ROUTES = ['/login', '/register', '/verify-otp']

export function proxy(request){
    const {pathname} = request.nextUrl;
    const token = request.cookies.get('jwt')?.value || null

    if(PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if(AUTH_ROUTES.includes(pathname) && token){
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();  // ← ye missing tha
}

export const config = {
    matcher:[
        '/checkout/:path*',
        '/profile/:path*',
        '/admin/:path*',
        '/login',
        '/register',
        '/verify-otp'
    ],
};