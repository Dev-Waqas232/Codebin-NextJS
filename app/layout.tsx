import { type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Codebin | Store, Share, Inspire: Your Code Hub",
  description: "Store, Share, Inspire: Your Code Hub",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AuthProvider>
          <ToastContainer />
          <main className="min-h-[100vh] hero">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
