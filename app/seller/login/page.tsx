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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-100">
      {/* Logo and Site Name */}
      <div className="flex items-center mb-8 mt-4">
        {/* SVG Logo */}
        <svg className="w-10 h-10 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="white"/>
          <path d="M16 10l-4 4-2-2" strokeWidth="2" stroke="currentColor" fill="none"/>
        </svg>
        <span className="text-3xl font-bold text-green-700 tracking-tight">Simplify Commerce</span>
      </div>
      <Tabs defaultValue="Login" className="w-full max-w-md">
        <TabsList className="w-full bg-transparent rounded-xl mb-2 border border-amber-200">
          <TabsTrigger className="w-full bg-green-50 data-[state=active]:bg-amber-50 data-[state=active]:font-bold data-[state=active]:text-green-700 text-green-700 font-semibold rounded-xl transition" value="Login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full bg-green-50 data-[state=active]:bg-amber-50 data-[state=active]:font-bold data-[state=active]:text-green-700 text-green-700 font-semibold rounded-xl transition" value="SignUp">
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
      <Card className="rounded-2xl shadow-xl border border-green-200 bg-amber-50">
        <CardHeader>
          <CardTitle><h1 className="text-3xl text-center text-green-700 font-bold">Manage Your Sales & Inventory</h1></CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onLogin} method="POST" className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-green-700">Email</Label>
              <Input type="email" name="email" required className="bg-green-50 focus:bg-white focus:border-green-500" />
            </div>
            <div>
              <Label htmlFor="password" className="text-green-700">Password</Label>
              <Input type="password" name="password" required className="bg-green-50 focus:bg-white focus:border-green-500" />
            </div>
            <Button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow transition" disabled={loading}>
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
      <Card className="rounded-2xl shadow-xl border border-green-200 bg-amber-50">
        <CardHeader>
          <CardTitle><h1 className="text-3xl text-center text-green-700 font-bold">Start Selling: Sign Up Now</h1></CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-green-700">Name</Label>
              <Input type="text" name="name" required className="bg-green-50 focus:bg-white focus:border-green-500" />
            </div>
            <div>
              <Label htmlFor="email" className="text-green-700">Email</Label>
              <Input type="email" name="email" required className="bg-green-50 focus:bg-white focus:border-green-500" />
            </div>
            <div>
              <Label htmlFor="password" className="text-green-700">Password</Label>
              <Input type="password" name="password" required className="bg-green-50 focus:bg-white focus:border-green-500" />
            </div>
            <Button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow transition">Create Seller Account</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
