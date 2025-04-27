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

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = await request.nextUrl.searchParams;
        const keyword = searchParams.get('keyword') as string || "";
        const forSeller = searchParams.get('seller') === 'true';
        const category = searchParams.get('category') as string;
        const sortby = searchParams.get('sortby') as string;
        const order = searchParams.get('order') as string;
        const page = searchParams.get('page') as string;

        let sellerId = 0;

        if (forSeller) {
            const payload:any = await getProfileFromRequest(request);
            if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            // Only seller can get their products
            if (payload.role !== 'seller') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            sellerId = payload.id;
            const products = await Product.findSellersProduct(sellerId, { keyword, category, sortby, order, page });
            return NextResponse.json(products, { status: 200 });
        } else {
            const products = await Product.findProducts({ keyword, category, sortby, order, page });
            return NextResponse.json(products, { status: 200 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch products', errorName: error.name }, { status: 500 });
    }
}