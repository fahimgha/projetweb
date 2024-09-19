import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

function loggingMiddle(req, res, nextMiddleware) {
  console.log("nouvelle request ", req.host);
  nextMiddleware();
}
app.use(loggingMiddle);
app.use(express.json());
app.use(cors());

app.get("/getLibrary", (req, res) => {
  // res.send("test");
  console.log(data);
  return res.json(data);
});

app.get("/getLibrary", (req, res) => {
  // res.send("test");
  console.log(data);
  return res.json(data);
});
app.get("/getLibrary/:id", (req, res) => {
  const id = req.params.id;

  const book = data.find((b) => b.idBook === id);

  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
  // console.log(data);
});
app.get("/getLibrary", (req, res) => {
  const idBook = req.query.idBook;

  return res.json(data[idBook]);
  // console.log(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
