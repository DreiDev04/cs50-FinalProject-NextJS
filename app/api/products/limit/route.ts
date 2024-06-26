import clientPromise from '@/lib/db';


export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default database from MongoDB URI

    const collection = db.collection('products');

    const products = await collection.find().sort({ _id: -1 }).limit(30).toArray();

    // console.log("Products fetched successfully: ", products);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};