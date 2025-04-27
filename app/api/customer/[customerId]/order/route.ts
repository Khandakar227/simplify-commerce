import { NextRequest, NextResponse } from 'next/server';
import Order from '@/lib/model/Order';

interface Params {
  params: Promise<{ customerId: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const customerId = (await params).customerId;
  try {
    const orders = await Order.findByCustomer(Number(customerId));
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
