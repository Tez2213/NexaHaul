import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
        role: 'shipper'
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

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
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: payload.userId,
        role: 'shipper'
      },
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        officeLocation: data.officeLocation,
        businessRegistrationNumber: data.businessRegistrationNumber,
        taxId: data.taxId,
        primaryCargoTypes: data.primaryCargoTypes,
        averageMonthlyShipments: data.averageMonthlyShipments,
        preferredContractorTypes: data.preferredContractorTypes,
        operatingRegions: data.operatingRegions,
        insuranceRequirements: data.insuranceRequirements,
        licensingRequirements: data.licensingRequirements
      }
    });

    const { password, ...profile } = updatedUser;
    return NextResponse.json(profile);

  } catch (error) {
    console.error('Profile PUT Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}