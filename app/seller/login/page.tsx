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

export default function Login() {
  const [user, _] = useUser();
  const router = useRouter();

  useEffect(() => {
    if(user?.name) router.replace("/seller/dashboard");
  }, [user])
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Tabs defaultValue="Login" className="max-w-[400px] w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="Login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="SignUp">
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Login">
          <LoginTab />
        </TabsContent>

        <TabsContent value="SignUp">
          <RegisterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const LoginTab = () => {
  const [loading, setLoading] = useState(false);
  const [_, setUser] = useUser();

  const onLogin = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formdata = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formdata);
      const res = await sellerLogin(
        data as { email: string; password: string }
      );
      if (res.error) alert(res.error);

      localStorage.setItem("access_token", res.token);
      setUser(res.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Sales & Inventory</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onLogin} method="POST">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" required />
            <Button className="mt-5 w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

const RegisterTab = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Start Selling: Sign Up Now</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" required />

            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required />

            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" required />

            <Button className="mt-5 w-full">Create Seller Account</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
