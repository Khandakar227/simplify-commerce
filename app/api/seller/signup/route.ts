import { NextRequest, NextResponse } from 'next/server';
import Seller from '@/lib/model/Seller';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) return NextResponse.json( { error: 'Name, email and password are required' }, { status: 400 });
        
        const hashedPassword = hashPassword(password);
        
        const seller = await Seller.createSignUp({ name, email, password: hashedPassword });
        console.log(seller);
        return NextResponse.json({ message: "Created seller" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}