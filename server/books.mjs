import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const uri = "mongodb://localhost:27017";

async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

async function findAllTasks(collection) {
  return collection.find({}).toArray();
}

// Endpoint pour récupérer les tâches
app.get("/getLibrary", async (req, res) => {
  try {
    const collection = await connectToMongo("dbbooks", "books");
    const books = await findAllTasks(collection);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.json({ message });
  }
});

app.post("/newBook", async (req, res) => {
  try {
    const collection = await connectToMongo("dbbooks", "books");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
