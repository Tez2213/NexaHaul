import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId, role } = await request.json();
    
    if (!userId || !role) {
      return NextResponse.json(
        { message: 'User ID and role are required' },
        { status: 400 }
      );
    }
    
    // Update user with role
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role }
    });
    
    return NextResponse.json(
      { 
        user: { 
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        message: 'Role set successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Set role error:', error);
    return NextResponse.json(
      { message: 'Error setting role', error: error.message },
      { status: 500 }
    );
  }
}