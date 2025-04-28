import { NextResponse } from 'next/server';
import { getProfileFromRequest } from "@/lib/auth";
import Customer from '@/lib/model/Customer';

export const GET = async (request: Request) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const user = await Customer.findByEmail(payload.email);
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt
        }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to get user, reason: '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}