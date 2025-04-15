"use client";

import { getSellerFromToken } from "@/lib/client-api";
import { useUser } from "@/lib/global-states/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getSellerFromToken(token as string)
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          localStorage.removeItem("access_token");
          router.push("/seller/login");
        } else setUser(data);
      })
      .catch((err) => {
        localStorage.removeItem("access_token");
        router.push("/seller/login");
        console.log(err);
      });
  }, []);

  return <>{children}</>;
}
