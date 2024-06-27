"use client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

const Nav: React.FC = () => {
  const isLogged = true;
  const { data: session } = useSession();

  return (
    <nav className="bg-secondary dark:bg-background flex gap-2 flex-center justify-between w-full p-5 outline outline-1 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/logos/logo-tindahan-v2.svg"
          width={40}
          height={40}
          alt="Tindahan Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary text-primary">
          Charina&apos;s Store
        </span>
      </Link>
      {/*DESKTOP NAVIGATION*/}

      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Button asChild variant="link">
              <Link href="/">Home</Link>
            </Button>
            {/* <Button asChild variant="link">
              <Link href="/contact">Contact</Link>
            </Button> */}
            <Button asChild variant="link">
              <Link href="/store">Store</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/search">Search</Link>
            </Button>
            {session?.user?.role === "admin" && (
              <Button asChild variant="link">
                <Link href="/admin">Admin</Link>
              </Button>
            )}
            <Button variant="outline">
              <Link href={"/api/auth/signout?callbackUrl=/"}>Sign Out</Link>
            </Button>
            <Avatar>
              {session?.user?.image ? (
                <AvatarImage src={session?.user?.image} />
              ) : (
                <AvatarImage src="/placeholders/Profile_avatar_placeholder_large.png" />
              )}
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <>
            <Button asChild variant="link">
              <Link href="/">Home</Link>
            </Button>
            {/* <Button asChild variant="link">
              <Link href="/contact">Contact</Link>
            </Button> */}
            <Button asChild variant="link">
              <Link href="/store">Store</Link>
            </Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              <Link href={"/api/auth/signin"}>Login with Email</Link>
            </Button>
          </>
        )}
      </div>

      {/*MOBILE NAVIGATION*/}
      <div className="sm:hidden flex relative">
        {session ? (
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  {session?.user?.image ? (
                    <AvatarImage src={session?.user?.image} />
                  ) : (
                    <AvatarImage src="/placeholders/Profile_avatar_placeholder_large.png" />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/store">Store</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="/search">Search</Link>
                </DropdownMenuItem>
                {session?.user?.role === "admin" && (
                  <DropdownMenuItem>
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              <Link href={"/api/auth/signin"}>Login</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
