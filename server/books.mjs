import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      res.status(200).send({ message: "Livre edité avec succès!" });
    } else {
      res.status(404).send({ message: "Livre non trouvé!" });
    }
  } catch (error) {
    console.error("Erreur lors de la modification du livre:", error);
    res.status(500).send({ message: "Erreur serveur" });
  }
});

app.put("/editBook/:id", async (req, res) => {
  const idBook = req.params.id;
  const updatedData = req.body; // Les nouvelles données du livre

  try {
    const collection = await connectToMongo("dbbooks", "books");

    // Mettre à jour le livre avec l'ID
    const result = await collection.updateOne(
      { _id: new ObjectId(idBook) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send({ message: "Livre mis à jour avec succès!" });
    } else {
      res.status(404).send({ message: "Livre non trouvé!" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre:", error);
  }
});

// Endpoint pour l'inscription
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const collection = await connectToMongo("dbbooks", "users");
  const existingUser = await collection.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "L'utilisateur existe déjà." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };

  try {
    await collection.insertOne(newUser);
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Endpoint pour la connexion
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const collection = await connectToMongo("dbbooks", "users");
  const user = await collection.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "Nom d'utilisateur non trouvé." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Mot de passe incorrect." });
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user._id }, "your_secret_key", {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});
// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
