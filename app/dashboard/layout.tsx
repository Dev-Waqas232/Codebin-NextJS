import AuthProvider from "@/components/AuthProvider";
import Nav from "@/components/Navbar";
import React, { ReactNode } from "react";

type DashBoardLayoutProps = {
  children: ReactNode;
};

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <AuthProvider>
      <Nav />
      <main className="text-white w-[90%] max-md:w-[98%] mx-auto p-6">
        {children}
      </main>
    </AuthProvider>
  );
};

export default DashBoardLayout;
