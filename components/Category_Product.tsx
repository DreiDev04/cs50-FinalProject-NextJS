import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import Link from "next/link";

type CategoryProps = {
  category: string;
  subCategories: string[];
};

const Category_Product = ({ category, subCategories }: CategoryProps) => {
  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };
  return (
    <div className="my-5">
      <h2 className="scroll-m-20  border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center md:text-start mb-5 text-primary">
        {formatCategory(category.toString())}
      </h2>
      <div className="grid md:grid-cols-5 grid-cols-1 gap-5">
        {subCategories.map((subCategory) => {
          return (
            <Card className="min-w-[200px] h-[180px] flex flex-col text-center justify-center">
              <CardHeader>
                <CardTitle>{formatCategory(subCategory)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm underline">
                <Link href={`/products/${category}/${subCategory}`} className="flex justify-center items-center">
                  View Products
                  <span className="ml-2">
                    <FaSquareArrowUpRight />
                  </span>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Category_Product;
