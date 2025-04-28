import { NextRequest, NextResponse } from 'next/server';
import Order from '@/lib/model/Order';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const orderId = (await params).id;
    console.log(orderId)
    const order = await Order.findById(Number(orderId));
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
