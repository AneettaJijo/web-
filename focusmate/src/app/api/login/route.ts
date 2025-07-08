// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { signToken } from '@/app/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  }

  const token = signToken({ username: user.username });

  const response = NextResponse.json({
    success: true,
    username: user.username
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return response;
}
