"use client";

import { getCustomerFromToken } from "@/lib/client-api";
import { useUser } from "@/lib/global-states/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadUser() {
  const [user, setUser] = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getCustomerFromToken(token as string)
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          localStorage.removeItem("access_token");
        } else setUser(data);
      })
      .catch((err) => {
        localStorage.removeItem("access_token");
        console.log(err);
      });
  }, []);

  return <></>;
}
