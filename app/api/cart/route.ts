import Cart from '@/lib/model/Cart';
import { getProfileFromRequest } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const payload: any = await getProfileFromRequest(req);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    
        const cartItemId = await Cart.addItem({ ...data, customerId: payload.id });
        return NextResponse.json({ success: true, cartItemId });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const payload: any = await getProfileFromRequest(req);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    
        const cartItems = await Cart.getItemsByCustomerId(payload.id);
        return NextResponse.json({ success: true, cartItems });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();
        const payload: any = await getProfileFromRequest(req);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    
        const cartItemId = await Cart.removeItem({ ...data, customerId: payload.id });
        return NextResponse.json({ success: true, cartItemId });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

