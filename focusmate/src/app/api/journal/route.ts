// app/api/journal/route.ts - GET and POST handlers
import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/dbConnect';
import Journal from '@/app/models/Journal';

// GET - Fetch all journal entries
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const entries = await Journal.find({})
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Journal.countDocuments();
    
    return NextResponse.json({
      success: true,
      data: entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('GET /api/journal error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new journal entry
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { title, content, date, mood, tags } = body;
    
    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    const newEntry = new Journal({
      title,
      content,
      date: date ? new Date(date) : new Date(),
      mood: mood || 'neutral',
      tags: tags || []
    });
    
    const savedEntry = await newEntry.save();
    
    return NextResponse.json({
      success: true,
      data: savedEntry
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/journal error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

