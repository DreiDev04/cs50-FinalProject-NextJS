import React from "react";
import { IProduct } from "@/models/Product";
import Cards from "@/components/Cards";

type QueriedProps = {
  products?: IProduct[];
};

const Queried: React.FC<QueriedProps> = ({ products }) => {
  return (
    <div className="container grid md:grid-cols-7 gap-2">
      <div className="col-span-2 min-h-screen hidden md:block"></div>
      <div className="col-span-5 min-h-screen border ">
        <div className="grid gap-5 p-10 md:grid-cols-3">
          {
          products?.length === 0 ? (
            <div className="text-center text-2xl md:text-nowrap">No products were found matching your selection.</div>
          ) : (
            products?.map((product: IProduct, index) => (
              <Cards product={product} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Queried;
