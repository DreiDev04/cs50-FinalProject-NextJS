"use client";
import Product_Card from "@/components/Product_Card";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { columns } from "@/app/admin/table/column";
import { DataTable } from "@/app/admin/table/data-table";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Admin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [datas, setdatas] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      const formatedData = data.map(
        (item: {
          _id: any;
          image_url: any;
          product_name: any;
          category: any;
          sub_category: any;
          net_wt: any;
          price: any;
          selling_price: any;
        }) => {
          return {
            id: item._id,
            image_url: item.image_url,
            product_name: item.product_name,
            category: (item.category as string)
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            sub_category: (item.sub_category as string)
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            net_wt: item.net_wt,
            price: item.price,
            selling_price: item.selling_price,
          };
        }
      );
      console.log(formatedData);
      setdatas(formatedData);
    };
    fetchData();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen grid place-content-center">
        Loading...
      </div>
    );
  }
  if (!session) {
    return (
      <div className="min-h-screen grid place-content-center">
        <h1>Please sign in to access this page.</h1>
        <Button asChild>
          <Link href="/api/auth/signin">Sign in</Link>
        </Button>
      </div>
    );
  }
  if (session && session?.user?.role !== "admin") {
    return (
      <div className="md:min-h-screen grid place-content-center">
        <h1>Unauthorize</h1>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen">
      <div className="container">
        <div className="mt-10 md:flex md:justify-end ">
          <Button
            variant="default"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full md:w-min"
          >
            Add Product
          </Button>
        </div>

        <Product_Card open={open} setOpen={setOpen} button_desc="Add" />
        <DataTable columns={columns} data={datas} />
      </div>
    </div>
  );
};

export default Admin;
