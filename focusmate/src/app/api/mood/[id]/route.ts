import {connectToDatabase} from '@/app/lib/dbConnect';
import Mood from '@/app/models/Mood'
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const updated = await Mood.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update mood entry' });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Mood.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete mood entry' });
  }
}
