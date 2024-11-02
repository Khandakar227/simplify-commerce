import { getProfileFromRequest } from "@/lib/auth";
import Product from "@/lib/model/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        // Only seller can add a product
        if (payload.role !== 'seller') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // Create product
        await Product.create({ ...data, sellerId: payload.id });

        return NextResponse.json({ message: "Created product" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create product', errorName: error.name },
            { status: 500 }
        );
    }
}
