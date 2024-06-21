import clientPromise from '@/lib/db';

export const POST = async (req: Request) => {
  try {
    const requestBody = await req.json();
    console.log("Request Body: ", requestBody);

    const { image_url, product_name, category, sub_category, net_wt, price, selling_price } = requestBody;

    console.log("Parsed Fields: ", { image_url, product_name, category, sub_category, net_wt, price, selling_price });

    const client = await clientPromise;
    const db = client.db(); // Use default database from MongoDB URI

    const collection = db.collection('products');

    const newProduct = {
      image_url,
      product_name,
      category,
      sub_category,
      net_wt,
      price,
      selling_price,
    };

    const result = await collection.insertOne(newProduct);
    const savedProduct = { ...newProduct, _id: result.insertedId };

    console.log("Product saved successfully: ", savedProduct);

    return new Response(JSON.stringify(savedProduct), { status: 201 });
  } catch (error) {
    console.error("Error saving product: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default database from MongoDB URI

    const collection = db.collection('products');

    const products = await collection.find().toArray();

    console.log("Products fetched successfully: ", products);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
