import { atom, useAtom } from "jotai";

const userAtom = atom<{
    id: string,
    name: string,
    email: string,
    role: string
} | null>(null);

export const useUser = () => useAtom(userAtom);
