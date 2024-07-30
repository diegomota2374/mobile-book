describe("form book", () => {
  describe("FormBook Component - New Mode", () => {
    it("go to new form", () => {
      cy.visit("/");

      cy.get('[data-testid="floatingButton"]').should("exist").click();

      cy.url().should("include", "/book/form");
    });

    it("fills and submits the form", () => {
      cy.get('[data-testid="title"]').type("Test Title");
      cy.get('[data-testid="author"]').type("Test Author");
      cy.get('[data-testid="category"]').select("Aventura");

      cy.contains("Adicionar Livro").click();

      cy.on("window:alert", (text) => {
        expect(text).to.contains("Livro adicionado com sucesso!");
      });
    });

    it("shows validation errors", () => {
      cy.get('[data-testid="floatingButton"]').should("exist").click();

      cy.url().should("include", "/book/form");

      cy.get('[data-testid="submit-button"]').click();

      cy.contains("O Título é obrigatório").should("be.visible");
      cy.contains("O Autor é obrigatório").should("be.visible");
      cy.contains("A Categoria é obrigatória").should("be.visible");

      cy.visit("/");
    });
  });

  describe("FormBook Component - Edit Mode", () => {
    const initialBook = {
      id: 1,
      title: "Original Title",
      author: "Original Author",
      category: "Aventura",
    };
    const jsonString = JSON.stringify(initialBook);

    const urlEncodedString = encodeURIComponent(jsonString);

    it("go to form edit", () => {
      cy.intercept("GET", "**/book/1", urlEncodedString).as("getBook");
      cy.intercept("PUT", "**/book/1", (req) => {
        req.reply((res) => {
          res.send({ ...req.body, success: true });
        });
      }).as("updateBook");

      cy.visit(`/book/${urlEncodedString}`);

      cy.url().should("include", `/book/${urlEncodedString}`);
    });

    it("pre-fills the form with existing book data", () => {
      cy.get('[data-testid="title"]').should(
        "have.value",
        `${initialBook.title}`
      );
      cy.get('[data-testid="author"]').should(
        "have.value",
        `${initialBook.author}`
      );
      cy.get('[data-testid="category"]').should(
        "have.value",
        `${initialBook.category}`
      );
    });

    it("fills end submit edit form", () => {
      cy.get('[data-testid="title"]').type("Test Title edit");
      cy.get('[data-testid="author"]').type("Test Author edit");
      cy.get('[data-testid="category"]').select("Aventura");

      cy.contains("Editar Livro").click();

      cy.on("window:alert", (text) => {
        expect(text).to.contains("Livro editado com sucesso!");
      });
    });
  });
});
