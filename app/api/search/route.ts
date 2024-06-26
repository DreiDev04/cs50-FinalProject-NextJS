import clientPromise from "@/lib/db";

export const GET = async (req: Request) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("products");

    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    let products;

    if (!query) {
      return new Response(JSON.stringify({ error: "Query parameter is required" }), { status: 400 });
    } else {
      products = await collection.find({product_name: { $regex: query, $options: "i" }}).toArray();
    }
    return new Response(JSON.stringify({ products }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
