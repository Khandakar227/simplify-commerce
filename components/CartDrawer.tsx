"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (open) {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(items);
      setSubtotal(items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
    }
  }, [open]);

  const updateQuantity = (productId: number, qty: number) => {
    const updated = cart.map(item => item.productId === productId ? { ...item, quantity: Math.max(1, qty) } : item);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setSubtotal(updated.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  };

  const removeItem = (productId: number) => {
    const updated = cart.filter(item => item.productId !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setSubtotal(updated.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
    setSubtotal(0);
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all ${open ? "visible" : "invisible pointer-events-none"}`}>
      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose}></div>
      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-green-200 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-100">
          <h2 className="text-xl font-bold text-green-700">Your Cart</h2>
          <button onClick={onClose} className="text-green-600 hover:text-green-800 text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center text-green-400 mt-12">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.productId} className="flex gap-4 items-center border-b pb-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded border" />
                  <div className="flex-1">
                    <div className="font-semibold text-green-700">{item.name}</div>
                    <div className="text-green-500 text-sm">৳{item.price} x {item.quantity}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-green-200 hover:bg-green-100 transition"
                      >
                        <span className="text-black">-</span>
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, Math.max(1, Number(e.target.value)))}
                        className="w-12 text-center border border-green-200 rounded-lg text-black"
                      />
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-green-200 hover:bg-green-100 transition"
                      >
                        <span className="text-black">+</span>
                      </button>
                      <button className="ml-4 text-red-500 hover:underline text-xs" onClick={() => removeItem(item.productId)}>Remove</button>
                    </div>
                  </div>
                  <div className="font-bold text-green-700">৳{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-green-100 px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-green-700">Subtotal</span>
            <span className="text-xl font-bold text-green-700">৳{subtotal}</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow mb-2" disabled={cart.length === 0}>Checkout</Button>
          <Button variant="outline" className="w-full" onClick={clearCart} disabled={cart.length === 0}>Clear Cart</Button>
        </div>
      </aside>
    </div>
  );
} 