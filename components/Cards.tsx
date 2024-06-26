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
  return (
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
          <span className="  text-sm"> - {product.net_wt}</span>
        </CardTitle>
        <CardDescription className="font-bold text-lg ">
          {product.category
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </CardDescription>
        <CardDescription>
          {product.sub_category
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-primary">₱{product.selling_price}</p>
      </CardFooter>
    </Card>
  );
};

export default Cards;
