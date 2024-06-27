import clientPromise from "@/lib/db";

export const GET = async (req: Request) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("products");

    const url = new URL(req.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return new Response(JSON.stringify({ error: "Query parameter is required" }), { status: 400 });
    }
    const formattedQuery = query.replace(/ /g, "_").toLowerCase();

    const products = await collection.find({
      $or: [
        { product_name: { $regex: query, $options: "i" } },
        { category: { $regex: formattedQuery, $options: "i" } },
        { sub_category: { $regex: formattedQuery, $options: "i" } },
      ]
    }).toArray();

    if (products.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), { status: 200 });
    }

    return new Response(JSON.stringify({ products }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
