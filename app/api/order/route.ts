import { NextRequest, NextResponse } from 'next/server';
import Order from '@/lib/model/Order';
import { getProfileFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const payload:any = await getProfileFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const insertId = await Order.create({...data, customerId: payload.id});
    return NextResponse.json({ success: true, orderId: insertId });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
