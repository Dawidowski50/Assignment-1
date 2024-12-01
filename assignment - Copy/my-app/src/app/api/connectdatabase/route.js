import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.kzu2c.mongodb.net/sampleapp?retryWrites=true&w=majority";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// Define and export the connectToDatabase function
export async function connectToDatabase() {
  return clientPromise;
}