import {connectToDatabase} from '@/app/lib/dbConnect';
import Mood from '@/app/models/Mood';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const mood = await Mood.create(body);
    return NextResponse.json({ success: true, data: mood });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Error creating mood entry' });
  }
}

export async function GET() {
  await connectToDatabase();
  try {
    const moods = await Mood.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: moods });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch mood entries' });
  }
}
