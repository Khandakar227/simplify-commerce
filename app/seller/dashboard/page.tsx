import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4">
        <div className="flex justify-between items-center gap-4">
            <h1 className="font-extrabold text-3xl py-4">DASHBOARD</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Products Inventory</CardTitle>
            <CardDescription>
              <div className="my-5 flex gap-4 items-center justify-center max-w-[400px] w-full">
                <Input type="search" placeholder="Search Products"/>
                <Button><Search/></Button>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>

          </CardContent>
        </Card>
    </div>
  )
}
