// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/app/lib/dbConnect';
import User from '@/app/models/User';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  await connectToDatabase();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ success: false, message: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashed });

  return NextResponse.json({ success: true, message: 'User registered successfully' });
}
