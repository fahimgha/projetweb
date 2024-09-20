import express from "express";
import { MongoClient, ObjectId } from "mongodb";
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
// Endpoint pour récupérer les tâches lu
app.get("/getReadedBook", async (req, res) => {
  const statusFilter = req.query.status;
  try {
    const collection = await connectToMongo("dbbooks", "books");

    let query = {};
    if (statusFilter) {
      query.status = statusFilter; // Apply status filter if provided
    }
    const books = await collection.find(query).toArray();
    res.json(books);
  } catch (error) {
    console.error(error);
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

app.delete("/deleteBook/:id", async (req, res) => {
  const idBook = req.params.id;

  try {
    const collection = await connectToMongo("dbbooks", "books");

    const result = await collection.deleteOne({ _id: new ObjectId(idBook) });

    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Livre supprimé avec succès!" });
    } else {
      res.status(404).send({ message: "Livre non trouvé!" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du livre:", error);
    res.status(500).send({ message: "Erreur serveur" });
  }
});
// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
