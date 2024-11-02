import { NextRequest, NextResponse } from 'next/server';
import Seller from '@/lib/model/Seller';
import { getProfileFromRequest } from '@/lib/auth';

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const seller = await Seller.updateByEmail(payload.email, data);
        console.log(seller);
        return NextResponse.json({ message: "Updated seller" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to update user'+ error.message },
            { status: 500 }
        );
    }
}

export const GET = async (request: Request) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const seller = await Seller.findByEmail({ email: payload.email });
        return NextResponse.json({
            id: seller.id,
            name: seller.name,
            email: seller.email,
            phone: seller.phone,
            createdAt: seller.createdAt
        }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to get user, reason: '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}