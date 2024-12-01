import { connectToDatabase } from '../connectdatabase/route';

export async function GET(req, res) {
  console.log("In the putInCart API page");

  // Extract the product name from the query parameters
  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname');
  console.log("Product to add to cart:", pname);

  const client = await connectToDatabase();
  const dbName = 'sampleapp';

  try {
    // Connect to the database and insert the product into the shopping_cart collection
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart');

    const myobj = { pname: pname, username: "sample@test.com" };
    const insertResult = await collection.insertOne(myobj);
    console.log('Insert result:', insertResult);

    // Return a response
    return new Response(JSON.stringify({ data: "Product added to cart successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return new Response(JSON.stringify({ message: 'Error adding product to cart', error: error.message }), { status: 500 });
  }
}