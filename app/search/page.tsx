"use client";

import { useState, Suspense, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Queried from "@/components/Queried";
import { fetchQuery } from "@/app/search/access";
import { IProduct } from "@/models/Product";
import { useSession } from "next-auth/react";
import Link from "next/link";

const FormSchema = z.object({
  query: z.string().min(1, {
    message: "Query must be at least 1 character.",
  }),
});

const Search = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      form.setValue("query", query);
      onSubmit({ query });
    }
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data: ", data);
    const params = new URLSearchParams(searchParams);
    if (data) {
      params.set("q", data.query);
      const res = await fetchQuery(data.query);
      console.log("Result: ", res);
      // setProducts(res);

      if (res && res.length > 0) {
        setProducts(res);
        setMessage("");
      } else {
        setProducts([]);
        setMessage("No products found");
      }

      // revalidatePath(pathname);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }
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

  return (
    <div className="md:min-h-screen">
      <header className="bg-primary h-16 flex justify-between items-center container">
        <h1 className="text-2xl font-extrabold text-background hidden md:block">
          Search Page
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-center items-center gap-3"
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

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
