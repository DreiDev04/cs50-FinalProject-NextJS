import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubcategory {
  [subcategory: string]: string[];
}

export interface ICategory extends Document {
  beverages: {
    coffee_and_creamer: ISubcategory;
    energy_drinks: ISubcategory;
    water: ISubcategory;
    soft_drinks: ISubcategory;
    powdered_drinks: ISubcategory;
    other_beverages: ISubcategory;
  };
  cigarettes_and_liquor: {
    cigarettes: ISubcategory;
    liquor: ISubcategory;
  };
  frozen_goods: {
    ice: ISubcategory;
    meat: ISubcategory;
    poultry: ISubcategory;
    seafood: ISubcategory;
    other_frozen_goods: ISubcategory;
  };
  canned_goods: ISubcategory;
  kitchen_essentials: {
    condiments: ISubcategory;
    cooking_oil: ISubcategory;
    noodles: ISubcategory;
    rice: ISubcategory;
    spices: ISubcategory;
    other_kitchen_essentials: ISubcategory;
  };
  personal_care: {
    diapers: ISubcategory;
    alcohol: ISubcategory;
    feminine_hygiene: ISubcategory;
    soap: ISubcategory;
    shampoo_and_conditioner: ISubcategory;
    other_personal_care: ISubcategory;
  };
  snacks: {
    biscuits_and_crackers: ISubcategory;
    candies_lollipops_gums_and_other_chewables: ISubcategory;
    chips_and_nuts: ISubcategory;
    cup_noodles: ISubcategory;
    pastries: ISubcategory;
    other_snacks: ISubcategory;
  };
  others: ISubcategory;
}

export interface IProduct extends Document {
  image_url: string;
  product_name: string;
  category: string;
  sub_category: string;
  net_wt: string;
  price: number;
  selling_price: number;
}
const productSchema = new Schema<IProduct>({
  image_url: {
    type: String,
    required: [true, "Image url is required"],
  },
  product_name: {
    type: String,
    required: [true, "Product name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  sub_category: {
    type: String,
    required: [true, "Sub Category is required"],
  },
  net_wt: {
    type: String,
    required: [true, "Net weight is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  selling_price: {
    type: Number,
    required: [true, "Selling price is required"],
  },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
