describe("form book", () => {
  describe("new form", () => {
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
    });
  });

  describe("edit form", () => {});
});
