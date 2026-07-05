import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request, { params }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/api/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');

  const isBodyless = ['GET', 'HEAD'].includes(request.method);
  const body = isBodyless ? undefined : await request.text();

  const backendRes = await fetch(url, {
    method: request.method,
    headers,
    body,
    redirect: 'manual',
  });

  const resBody = await backendRes.arrayBuffer();

  // Backend response headers copy karo, lekin encoding-related headers hata do
  // kyunki fetch() already decompress kar chuka hai body ko
  const responseHeaders = new Headers(backendRes.headers);
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');

  const nextResponse = new NextResponse(resBody, {
    status: backendRes.status,
    headers: responseHeaders,
  });

  // multiple Set-Cookie headers sahi tarike se forward karo
  nextResponse.headers.delete('set-cookie');
  const setCookies = backendRes.headers.getSetCookie?.() || [];
  setCookies.forEach((cookie) => nextResponse.headers.append('set-cookie', cookie));

  return nextResponse;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};