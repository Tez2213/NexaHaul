import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Get token from authorization header
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get user ID
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch user profile from database
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
        role: 'contractor'
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive information
    const { password, ...profile } = user;
    return NextResponse.json(profile);

  } catch (error) {
    console.error('Profile GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await request.json();

    // Update user profile in database
    const updatedUser = await prisma.user.update({
      where: {
        id: payload.userId,
        role: 'contractor'
      },
      data: {
        name: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        profileImage: data.profileImage,
        companyName: data.companyName,
        companyRegistrationNo: data.companyRegistrationNo,
        companyAddress: data.companyAddress,
        taxId: data.taxId,
        website: data.website,
        yearsInBusiness: parseInt(data.yearsInBusiness) || undefined,
        employeeCount: parseInt(data.employeeCount) || undefined,
        companyLogo: data.companyLogo,
        idType: data.idType,
        idNumber: data.idNumber,
        idExpiryDate: data.idExpiryDate ? new Date(data.idExpiryDate) : undefined,
        idFrontImage: data.idFrontImage,
        idBackImage: data.idBackImage,
        vehicleTypes: data.vehicleTypes,
        serviceAreas: data.serviceAreas,
        specializations: data.specializations,
        insuranceProvider: data.insuranceProvider,
        insurancePolicy: data.insurancePolicy,
        insuranceExpiryDate: data.insuranceExpiryDate ? new Date(data.insuranceExpiryDate) : undefined,
        walletAddress: data.walletAddress
      }
    });

    const { password, ...profile } = updatedUser;
    return NextResponse.json(profile);

  } catch (error) {
    console.error('Profile PUT Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}