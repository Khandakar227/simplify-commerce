import { NextRequest, NextResponse } from 'next/server';
import { init } from '@/lib/conn';
import { products } from '@/data/techshopbd';

export const GET = async (request: NextRequest) => {
    try {
        // await init();
        await Promise.all(  
            products.map(async(product) => {
            const res = await fetch('http://localhost:3000/api/product', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiaWQiOjEsImVtYWlsIjoicmlmYXRzYXJ3YXJAaXV0LWRoYWthLmVkdSIsIm5hbWUiOiJSaWZhdCIsImNyZWF0ZWRBdCI6IjIwMjQtMTEtMjFUMDU6MDA6NTcuMDAwWiIsImlhdCI6MTczMjE2NTI4NiwiZXhwIjoxNzMyMTY4ODg2fQ.5Pt88YLsu_l-09JkBqbV3nLXr9Syu5EfcO5qhgUgDHE`
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

        return NextResponse.json({ message: 'Database initialized' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
    }
}