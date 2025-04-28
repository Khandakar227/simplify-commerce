import { UserCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function Navbar() {
    return (
        <div>
            <nav className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-green-200 shadow-sm flex items-center justify-between px-8 py-6">
                <div className="flex items-center">
                  {/* SVG Logo */}
                  <svg className="w-8 h-8 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="white"/>
                    <path d="M16 10l-4 4-2-2" strokeWidth="2" stroke="currentColor" fill="none"/>
                  </svg>
                  <span className="text-2xl font-bold tracking-wide text-green-700">Simply Commerce</span>
                </div>
                <div className="flex-1 flex justify-center">
                  <Tabs defaultValue="dashboard">
                    <TabsList className="bg-transparent gap-2 flex">
                      <TabsTrigger value="dashboard" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-4 transition bg-green-50">Dashboard</TabsTrigger>
                      <TabsTrigger value="orders" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-4 transition bg-green-50">Orders</TabsTrigger>
                      <TabsTrigger value="products" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-4 transition bg-green-50">Products</TabsTrigger>
                      <TabsTrigger value="settings" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-4 transition bg-green-50">Settings</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <button className="rounded-full p-2 hover:bg-green-100 transition border border-green-200 flex items-center justify-center">
                  <UserCircle size={32} className="text-green-600" />
                </button>
              </nav>
        </div>
    );
}