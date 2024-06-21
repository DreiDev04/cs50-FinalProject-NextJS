import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async (req) => {
    // console.log("PATH: ",req.nextUrl.pathname);
    // console.log("TOKEN: ", req.nextauth.token?.role);

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/admin", ] };
