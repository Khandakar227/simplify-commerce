"use client"

import { getSellerFromToken } from "@/lib/client-api";
import { useUser } from "@/lib/global-states/user";
import { useEffect } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useUser();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        getSellerFromToken(token as string)
        .then(data => {
            console.log(data);
            if(data.error) console.log(data.error);
            else setUser(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

  return <>{children}</>;
}
