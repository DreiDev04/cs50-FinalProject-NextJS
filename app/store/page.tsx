"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/models/Product";


import All_Products from "@/components/All_Products";
import Category_Product from "@/components/Category_Product";
import { categories } from "@/components/categories";

const StorePage: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      const formatedData = data.map(
        (item: {
          _id: string;
          image_url: string;
          product_name: string;
          category: string;
          sub_category: string;
          net_wt: string;
          price: number;
          selling_price: number;
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
      setProducts(formatedData);
    };
    fetchData();
  }, []);

  

  return (
    <div className="md:min-h-screen">
      <div className="container">
        <All_Products products={products} />
        {
          Object.entries(categories).map(([category, subCategories]) => (
            <Category_Product key={category} category={category} subCategories={subCategories} />
          ))
        }
      </div>
    </div>
  );
};

export default StorePage;
