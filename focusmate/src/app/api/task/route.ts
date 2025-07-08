import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/dbConnect';
import Task from '@/app/models/Task';

export async function GET() {
  await connectToDatabase();
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    return NextResponse.json({ success: true, data: tasks });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch tasks.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const task = await Task.create(body);
    return NextResponse.json({ success: true, data: task });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create task.' }, { status: 400 });
  }
}
