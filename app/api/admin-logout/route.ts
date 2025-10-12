import { NextResponse } from 'next/server';

export async function POST() {
  // Set the same cookie name but empty value and expired date
  return new NextResponse(JSON.stringify({ success: true, message: 'Logged out successfully!' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    },
  });
}
