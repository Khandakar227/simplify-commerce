import { getProfileFromRequest } from "@/lib/auth";
import { Category } from "@/lib/model/Category";
import Product from "@/lib/model/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const categories = await Category.getAll();
        return NextResponse.json(categories, { status: 200 });        
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch category', errorName: error.name }, { status: 500 });
    }
}