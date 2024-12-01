import { connectToDatabase } from '../connectdatabase/route';

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db("sampleapp");

    const products = await db.collection('products').find().toArray();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: 'Error fetching products', error: error.message }), { status: 500 });
  }
}
