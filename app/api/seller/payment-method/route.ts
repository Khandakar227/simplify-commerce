import { NextRequest, NextResponse } from 'next/server';
import { getProfileFromRequest } from '@/lib/auth';
import { PaymentMethod } from '@/lib/model/PaymentMethod';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const paymentMethod = await PaymentMethod.create({ ...data, sellerId: payload.id });

        return NextResponse.json({ message: "Add Payment Method", paymentMethod }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to add payment method. '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}

export const GET = async (request: Request) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const paymentMethods = await PaymentMethod.findBySellerId(payload.id);
        
        return NextResponse.json({ paymentMethods }, { status: 200 });

    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to get user, reason: '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}