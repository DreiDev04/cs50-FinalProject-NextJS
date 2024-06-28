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

type CardProps = {
  product: IProduct;
};

const Cards = ({ product }: CardProps) => {
  product.category = product.category
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
  product.sub_category = product.sub_category
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Card className="max-h-[400px]  min-h-[400px] flex flex-col justify-between">
      <div>
        <CardContent className="container min-h-[225px] flex justify-center items-center">
          <Image
            src={product.image_url}
            width={200}
            height={200}
            alt={product.product_name}
            priority={true}
          />
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle>
            <span className=" text-base">{product.product_name}</span>
          </CardTitle>
          <CardDescription className="font-bold text-md">
            <p className=" text-xs font-light">{product.net_wt}</p>
            <p className=" text-sm font-semibold">{product.category}</p>
            <p className=" text-xs font-light">{product.sub_category}</p>
          </CardDescription>
        </CardHeader>
      </div>
      <CardFooter className="px-4">
        <p className="text-primary">₱{product.selling_price}</p>
      </CardFooter>
    </Card>
  );
};

export default Cards;
