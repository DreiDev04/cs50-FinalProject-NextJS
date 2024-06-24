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
import { uploadProduct } from "@/app/admin/actions";
import SubmitFormButton from "@/components/SubmitFormButton";
import { revalidatePath } from "next/cache";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories } from "@/components/categories";

type CategoryKey = keyof typeof categories;

type Product_CardProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  button_desc: string;
};

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  product_name: z.string().min(1, { message: "Please enter a product name" }),
  category: z.string().min(1, { message: "Please select a sub category" }),
  sub_category: z.string().min(1, { message: "Please select a category" }),
  net_wt: z.string().min(1, { message: "Please enter the net weight" }),
  price: z.string().optional(),
  selling_price: z
    .string()
    .min(1, { message: "Please enter the selling price" }),
});

const Product_Card = ({ open, setOpen, button_desc }: Product_CardProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryKey | null | string
  >("beverages");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: "",
      product_name: "",
      category: "",
      sub_category: "",
      net_wt: "",
      price: "",
      selling_price: "",
    },
  });

  const closeDialog = () => {
    setSelectedCategory(null);
    setSelectedImage(null);
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      closeDialog();
    }
  }, [open]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("image", selectedImage || "");

    try {
      const result = await uploadProduct(null, formData);
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          image_url: result.message,
          product_name: data.product_name,
          category: data.category,
          sub_category: data.sub_category,
          net_wt: data.net_wt,
          price: Number(data.price),
          selling_price: Number(data.selling_price),
        }),
      });

      if (response.status === 201) {
        console.log("Product added successfully: ");
      } else {
        console.log("Failed to add product: ", response);
      }

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      closeDialog();

      window.location.reload();
    } catch (error) {
      console.error("Failed to submit form: ", error);
    }
  };

  const toSentenceCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("category", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{button_desc} Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px] w-full p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 px-2"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        id="image"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
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
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categories).map((category) => (
                            <SelectItem
                              key={category}
                              {...field}
                              value={category}
                            >
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
              {selectedCategory && (
                <FormField
                  control={form.control}
                  name="sub_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Category</FormLabel>
                      <FormControl>
                        <Select  onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sub Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories[selectedCategory as CategoryKey].map(
                              (category) => (
                                <SelectItem
                                  key={category}
                                  {...field}
                                  value={category}
                                >
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
              )}
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
                    <FormLabel>Price.</FormLabel>
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
              <SubmitFormButton button_desc={button_desc} />
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Product_Card;
