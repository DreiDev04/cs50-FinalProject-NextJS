import React from "react";
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
import { IProduct } from "@/models/Product";
import Image from "next/image";
import Cards from "@/components/Cards";

type All_Props = {
  products: IProduct[];
};

export default function All_Products({ products }: All_Props) {
  return (
    <div>
      <h2 className="scroll-m-20  border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center md:text-start mb-5 text-primary">
        Products
      </h2>
      <Carousel className="md:px-10 mx-10">
        <CarouselPrevious />
        <CarouselContent>
          {products.map((product: IProduct) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/4"
              key={product.id}
            >
              <Cards product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
