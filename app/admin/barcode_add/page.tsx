"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  product_name: string;
  categories: string;
  countries_tags: string[];
}

const BarcodeAdd: React.FC = () => {
  const [barcode, setBarcode] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProductData = async (barcode: string) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
        headers: {
          'User-Agent': 'HealthyFoodChoices - Android - Version 1.0',
        },
      });
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data.product);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setProduct(null);
    }
  };

  const handleSearch = () => {
    fetchProductData(barcode);
    console.log("search");
    console.log(barcode);
    console.log(product);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
  };

  return (
    <div className="h-screen container p-10 ">
      <div className="flex justify-center mb-10">
        <div className="flex w-full max-w-2xl items-center space-x-2">
          <Input
            type="text"
            placeholder="Barcode"
            value={barcode}
            onChange={handleInputChange}
          />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex justify-center mb-10 text-red-500">
          {error}
        </div>
      )}

      {product && (
        <div className="bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">Origin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.categories}</TableCell>
                <TableCell className="text-right">{product.countries_tags.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BarcodeAdd;
