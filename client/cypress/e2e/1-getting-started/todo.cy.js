/// <reference types="cypress" />

describe("Formulaire d'inscription", () => {
  // Test 1 : Charger la page d'inscription
  it("devrait charger la page d'inscription avec le formulaire", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get("form").should("be.visible");
  });

  // Test 2 : Soumission réussie du formulaire
  it("devrait soumettre le formulaire avec succès", () => {
    cy.visit("http://localhost:5173/signup");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });

    cy.get('input[id="username"]').type("tde");
    cy.get('input[id="password"]').type("test");

    cy.get("form").submit();

    cy.get("@alertStub").should(
      "be.calledWith",
      "Signup successful! Please login."
    );
    cy.url().should("include", "http://localhost:5173/");
  });

  // Test 3 : login
  it("devrait verifier le login", () => {
    cy.visit("http://localhost:5173/login");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });

    cy.get('input[id="username"]').type("test1");
    cy.get('input[id="password"]').type("test1");

    cy.get("form").submit();

    cy.get("@alertStub").should("be.calledWith", "Login successful!");
    cy.url().should("include", "http://localhost:5173/");
  });

  // Test 3 : Validation de champ vide
  it("devrait afficher un message d'erreur si le champ email est vide", () => {
    cy.visit("http://localhost:5173/#/contact");

    cy.get('input[id="name"]').type("John Doe");
    cy.get('textarea[id="message"]').type("welcome");

    cy.get("form").submit();

    cy.get(".error-message").should("contain", "Le champ email est requis");
  });
});
