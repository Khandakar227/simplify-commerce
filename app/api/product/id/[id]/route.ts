import { getProfileFromRequest } from "@/lib/auth";
import Product from "@/lib/model/Product";
import { NextResponse } from "next/server";

export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        
        const id = (await params).id;
        const data = await request.json();
        // Seller can only update their own product
        await Product.update(id, payload.id, data);
        return NextResponse.json({ message: "Updated product" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to update product', errorName: error.name },
            { status: 500 }
        );
    }
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        
        const id = (await params).id;
        // Seller can only delete their own product
        await Product.deleteById(id, payload.id);
        return NextResponse.json({ message: "Deleted product" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to delete product', errorName: error.name },
            { status: 500 }
        );
    }
}