import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/techshopbd';
import { getProfileFromRequest } from '@/lib/auth';

export const GET = async (request: NextRequest) => {
    try {
        const token = request.headers.get('Authorization')?.substring(7);

        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

        await Promise.all(
            products.map(async (product) => {
                const res = await fetch('http://localhost:3000/api/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: product.title,
                        price: parseFloat(product.price),
                        category: product.category,
                        pictures: [product.picture.replace("https://admin.techshopbd.com/uploads/product", "/product_images")],
                        description: product.description,
                        stock: Math.floor(Math.random() * 400)
                    })
                });
                await res.json();
                console.log("Added");
            })
        );
        return NextResponse.json({ message: 'Dummy Products added' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to add products to the database' }, { status: 500 });
    }
}