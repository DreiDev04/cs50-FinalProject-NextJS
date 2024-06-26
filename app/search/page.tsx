"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Queried from "@/components/Queried";
import { fetchQuery } from "@/app/search/access";
import { revalidatePath } from "next/cache";
import { IProduct } from "@/models/Product";

const FormSchema = z.object({
  query: z.string().min(1, {
    message: "Query must be at least 1 character.",
  }),
});

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data: ", data);
    const params = new URLSearchParams(searchParams);
    if (data) {
      params.set("q", data.query);
      const res = await fetchQuery(data.query);
      console.log("Result: ", res);
      setProducts(res);

      // revalidatePath(pathname);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
    
  }
  return (
    <div className="md:min-h-screen">
      <header className="bg-primary h-16 flex justify-between items-center container">
        <h1 className="text-2xl font-extrabold text-background hidden md:block">Search Page</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex justify-center items-center gap-3"
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"}>
              Search
            </Button>
          </form>
        </Form>
      </header>
      <div>
        <h1 className="text-2xl font-extrabold text-background">
          Search Results
        </h1>
        <div>
          <Queried products={products} />
        </div>
      </div>
    </div>
  );
};

export default Search;
