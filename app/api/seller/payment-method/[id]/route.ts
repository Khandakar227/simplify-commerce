import { getProfileFromRequest } from "@/lib/auth";
import { PaymentMethod } from "@/lib/model/PaymentMethod";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const data = await request.json();

        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const paymentMethod = await PaymentMethod.update(parseInt(id), payload.id, { ...data });

        return NextResponse.json({ message: "Payment Method Updated", paymentMethod }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to add payment method. '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        await PaymentMethod.deleteById(parseInt(id), payload.id);
        return NextResponse.json({ message: "Deleted Payment Method" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to delete payment method. '+ error.message, errorName: error.name },
            { status: 500 }
        );
    }
}