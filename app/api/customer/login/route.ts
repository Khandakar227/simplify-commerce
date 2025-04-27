import { NextRequest, NextResponse } from 'next/server';
import Seller from '@/lib/model/Seller';
import { checkPasswordMatch, createToken } from '@/lib/auth';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });

        const seller = await Seller.findByEmail({ email });
        if (!seller) return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
        const isPasswordMatch = checkPasswordMatch(password, seller.password);
        if (!isPasswordMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        const user = { role: "customer", id: seller.id, email: seller.email, name: seller.name }
        const token = createToken({ ...user, createdAt: seller.createdAt });
        const refreshToken = randomBytes(20).toString('hex');

        return NextResponse.json({ token, refreshToken, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to log in (reason: Server)' },
            { status: 500 }
        );
    }
}