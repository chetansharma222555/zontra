import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
  const { email , password } = await req.json();

  if (
    email === process.env.ADMIN_USEREMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate a JWT token for session
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET as string, {
      expiresIn: "7d", // token valid for 7 days
    });

    // Set cookie with the token
    return new NextResponse(JSON.stringify({ success: true , message:"Login Successfully!" }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`,
      },
    });
  }

  return new NextResponse(JSON.stringify({ success: false, message: "Invalid credentials" }), {
    status: 401,
  });
}
