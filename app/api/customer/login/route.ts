import { NextRequest, NextResponse } from 'next/server';
import Customer from '@/lib/model/Customer';
import { checkPasswordMatch, createToken } from '@/lib/auth';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json() as { email: string; password: string };
        if (!email || !password) return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });

        const user = await Customer.findByEmail(email);
        if (!user) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        if (user?.isGuest) return NextResponse.json({ error: 'Guest account cannot login' }, { status: 403 });
        if (!user?.password) return NextResponse.json({ error: 'Password not set' }, { status: 403 });
        const isPasswordMatch = checkPasswordMatch(password, user?.password);
        if (!isPasswordMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        const userData = { role: "customer", id: user.id, email: user?.email, name: user?.name }
        const token = createToken({ ...userData, createdAt: user.createdAt });
        const refreshToken = randomBytes(20).toString('hex');

        return NextResponse.json({ token, refreshToken, user: userData }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to log in (reason: Server)' },
            { status: 500 }
        );
    }
}