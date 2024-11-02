import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { getProfileFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const payload:any = await getProfileFromRequest(request);
        if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        // Only seller can add a product
        if (payload.role !== 'seller') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();

        const files = formData.getAll("images") as File[];
        if (files.length === 0) return NextResponse.json({ status: "fail", error: "No files uploaded" });

        const pictures: string[] = [];
        await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const random_prefix = randomBytes(3).toString('hex');
                await fs.writeFile(`./public/product_images/${random_prefix + "_" + file.name}`, buffer);
                pictures.push(`/product_images/${random_prefix}_${file.name}`);
            })
        );

        revalidatePath("/");

        return NextResponse.json({ status: "success", pictures });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload the images', errorName: error.name  });
    }
}