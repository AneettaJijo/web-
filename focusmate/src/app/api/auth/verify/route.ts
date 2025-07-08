// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ success: false });
  }

  try {
    const decoded = verifyToken(token) as { username: string };
    return NextResponse.json({ success: true, username: decoded.username });
  } catch {
    return NextResponse.json({ success: false });
  }
}
