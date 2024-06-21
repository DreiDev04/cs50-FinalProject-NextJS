"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IProduct } from "@/models/Product";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div className="container flex justify-center flex-col items-center">
        <Image
          src="/logos/logo-tindahan-v2.svg"
          width={100}
          height={100}
          alt="logo"
          priority={true}
        />
        <h1 className="text-2xl font-semibold">Welcome to Charina's Store</h1>
      </div>
      <div className="container">
        <h2 className="scroll-m-20  border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center md:text-start mb-5">
          Products
        </h2>
        <Carousel className="px-10 mx-10">
          <CarouselPrevious />
          <CarouselContent>
            {products.map((product: IProduct) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/5"
                key={product.id}
              >
                <Card className="min-h-[350px]">
                  <CardContent className="container min-h-[200px] flex justify-center items-center">
                    <Image
                      src={product.image_url}
                      width={200}
                      height={200}
                      alt={product.product_name}
                      priority={true}
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle>
                      {product.product_name}
                      <span className="font-thin text-sm"> - {product.net_wt}</span>
                    </CardTitle>
                    <CardDescription className="font-bold text-lg">
                      {product.category}
                    </CardDescription>
                    <CardDescription>{product.sub_category}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <p>₱{product.selling_price}</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default StorePage;
