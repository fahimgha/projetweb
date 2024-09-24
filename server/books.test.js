import { expect, test } from "vitest";

test("devrait verifier qu'on recoit une liste", async () => {
  const response = await fetch(`http://localhost:3000/getLibrary`);
  const books = await response.json(); //conversion en json

  expect(books).toBeInstanceOf(Array);
});

test("devrait ajouter un nouveau livre", async () => {
  const newBook = {
    name: "L'étranger",
    author: "Albert Camus",
    status: "lu",
  };

  const response = await fetch(`http://localhost:3000/newBook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });

  const result = await response.json();
  expect(result).toHaveProperty("insertedId");
  // verifier que result contient l'ID du livre inséré
});

test("devrait vérifier les informations d'un livre de la base de données", async () => {
  const response = await fetch(`http://localhost:3000/getLibrary`);

  expect(response.ok).toBe(true); // Vérifie que la réponse est 2xx

  const books = await response.json();

  // Maintenant, on peut accéder en toute sécurité à books[0]
  expect(books[0]).toEqual(
    expect.objectContaining({
      name: "L'étranger", // Assure-toi que ça correspond à ta structure de données
      author: "Albert Camus",
      status: "lu",
    })
  );
});
