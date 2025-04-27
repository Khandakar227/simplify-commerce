import { atom, useAtom } from "jotai";

const cartAtom = atom<{
    id: number,
    customerId: number,
    productId: number,
    quantity: number,
    image: string,
    price: number,
    name: string
}[]>([]);

export const useCart = () => useAtom(cartAtom);
