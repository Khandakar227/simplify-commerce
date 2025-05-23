import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";
import LoadUser from "@/components/LoadCustomer";


export const metadata: Metadata = {
  title: "Simplify Commerce",
  description: "Generated by create next app",
  icons:{
    icon: "/simplify.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className="antialiased"
      >
        <LoadUser />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
