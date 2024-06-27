"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-14 md:px-20 h-screen">
      <div className="my-auto">
        <Image
          src="/illustrations/shopping-illustration.svg"
          width={600}
          height={600}
          alt="Image of Illustration"
          className="mx-auto md:my-20 my-10"
        />
      </div>
      <div className=" flex flex-col gap-5 justify-center md:px-9">
        <h1 className="hero_text text-end mx-auto">
          <span className="block">Welcome to Charina&apos;s Store:</span>
          <span className="gradient_text">
            Your Ultimate Destination for the Best Prices!
          </span>
        </h1>
        <p className="text-end">
          Explore our wide range of products and find the best deals today.
        </p>
        <br />
        <div className="self-end">
          {session ? (
            <Button variant={"default"}>
              <Link href="/store">Go to Store</Link>
            </Button>
          ) : (
            <Button variant={"default"}>
              <Link href="/api/auth/signin">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
