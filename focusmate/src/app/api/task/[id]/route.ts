import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/dbConnect';
import Task from '@/app/models/Task';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const task = await Task.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: task });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update task.' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Task.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete task.' }, { status: 400 });
  }
}
