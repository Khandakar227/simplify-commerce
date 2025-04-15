import { NextRequest, NextResponse } from 'next/server';
import { init } from '@/lib/conn';

export const GET = async (request: NextRequest) => {
    try {
        await init();
        return NextResponse.json({ message: 'Database initialized' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
    }
}