"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories } from "@/components/categories";
import { IProduct } from "@/models/Product";
import { Button } from "@/components/ui/button";

type CategoryKey = keyof typeof categories;

type Product_CardProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product_id: string;
};

const FormSchema = z.object({
  image_url: z.string().optional(),
  product_name: z.string().optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  net_wt: z.string().optional(),
  price: z.union([z.string(), z.number()]).optional(),
  selling_price: z.union([z.string(), z.number()]).optional(),
});

const Edit_Card = ({ open, setOpen, product_id }: Product_CardProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    "beverages"
  );
  const [productData, setProductData] = useState<IProduct>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image_url: "",
      product_name: "",
      category: "",
      sub_category: "",
      net_wt: "",
      price: "0",
      selling_price: "0",
    },
  });

  useEffect(() => {
    const fetchProductData = async () => {
      if (open && product_id) {
        try {
          const response = await fetch(`/api/products/${product_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProductData(data.result);
          form.reset(data.result); // Update form values with fetched data
          setSelectedCategory(data.result.category as CategoryKey);
        } catch (error) {
          console.error("Fetching product data failed:", error);
        }
      }
    };

    fetchProductData();
  }, [open, product_id]);

  const closeDialog = () => {
    // setSelectedCategory(null);
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      closeDialog();
    }
  }, [open]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch(`/api/products/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      const updatedProduct = JSON.parse(text);
      toast({
        title: "Successfully updated the value:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      console.log("Updated product:", updatedProduct);
      closeDialog();
      window.location.reload();
    } catch (error) {
      console.error("Updating product failed:", error);
      toast({
        title: "Update failed",
        description:
          "There was an error updating the product. Please try again.",
      });
    }
  };

  const toSentenceCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as CategoryKey);
    form.setValue("category", value);
    form.setValue("sub_category", "");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        aria-description="Edit product details form"
        aria-des
      >
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px] w-full p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 px-2"
            >
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled
                        {...field}
                        value={field.value || productData?.image_url || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={handleCategoryChange}
                        value={form.watch("category")}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categories).map((category) => (
                            <SelectItem key={category} value={category}>
                              {toSentenceCase(
                                category.replace(/_/g, " ").toLowerCase()
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sub_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={form.watch("sub_category")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sub category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories[selectedCategory as CategoryKey].map(
                            (category) => (
                              <SelectItem key={category} value={category}>
                                {toSentenceCase(
                                  category.replace(/_/g, " ").toLowerCase()
                                )}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="net_wt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Wt.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. 100g, 50ml"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="selling_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-around">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="w-1/3"
                  type="reset"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/3">
                  Edit
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Edit_Card;
