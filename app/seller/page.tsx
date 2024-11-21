"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sellerLogin } from "@/lib/client-api";
import { FormEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/global-states/user";
import { useRouter } from "next/navigation";

export default function Seller() {
    return(
        <div>
            Hello
        </div>
    )
}