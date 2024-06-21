"use client";
import { SessionProvider } from "next-auth/react";


const Provider: React.FC<any> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
