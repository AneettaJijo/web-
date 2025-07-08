// app/api/journal/[id]/route.ts - GET, PUT, DELETE handlers for specific entry
import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/dbConnect';
import Journal from '@/app/models/Journal';
import mongoose from 'mongoose';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Fetch single journal entry
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid entry ID' },
        { status: 400 }
      );
    }
    
    const entry = await Journal.findById(params.id);
    
    if (!entry) {
      return NextResponse.json(
        { success: false, error: 'Journal entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: entry
    });
  } catch (error: any) {
    console.error(`GET /api/journal/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update journal entry
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid entry ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { title, content, date, mood, tags } = body;
    
    const updatedEntry = await Journal.findByIdAndUpdate(
      params.id,
      {
        title,
        content,
        date: date ? new Date(date) : undefined,
        mood,
        tags
      },
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedEntry) {
      return NextResponse.json(
        { success: false, error: 'Journal entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedEntry
    });
  } catch (error: any) {
    console.error(`PUT /api/journal/${params.id} error:`, error);
    
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

// DELETE - Delete journal entry
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid entry ID' },
        { status: 400 }
      );
    }
    
    const deletedEntry = await Journal.findByIdAndDelete(params.id);
    
    if (!deletedEntry) {
      return NextResponse.json(
        { success: false, error: 'Journal entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error: any) {
    console.error(`DELETE /api/journal/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}