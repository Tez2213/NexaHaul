import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test connection by getting user count
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Connected to database successfully',
      userCount
    });
  } catch (error) {
    console.error('DB connection error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message 
    }, { status: 500 });
  }
}