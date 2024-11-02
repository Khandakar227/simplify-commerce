import { getProfileFromRequest } from "@/lib/auth";
import Product from "@/lib/model/Product";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
    try {
        const slug = (await params).slug;
        const product = await Product.findBySlug(slug) || null;
        
        return NextResponse.json({product}, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to get products' },
            { status: 500 }
        );
    }
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        const slug = (await params).slug;
        await Product.deleteBySlug(slug, payload.id);

        return NextResponse.json({ message: "Deleted product" }, { status: 200 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to delete product', errorName: error.name },
            { status: 500 }
        );
    }
}