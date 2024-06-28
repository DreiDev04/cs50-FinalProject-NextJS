"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  const {data: session} = useSession();

  return (
    <div>
      <header className="container flex justify-center flex-col items-center">
        <Image
          src="/logos/logo-tindahan-v2.svg"
          width={100}
          height={100}
          alt="logo"
          priority={true}
        />
        <h1 className="text-2xl font-semibold">Welcome to Charina's Store</h1>
        <div className="my-5 flex gap-2 ">
          <Button asChild>
            {session?.user ? (
              <Link href="/search">Search Product</Link>
            ):(
              <Link href="/api/auth/signin">Login to Search</Link>
              
            )}
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default StoreLayout;
