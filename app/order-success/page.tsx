// app/order-success/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for your purchase. We've sent a confirmation to your email.</p>
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link href="/orders">View Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}