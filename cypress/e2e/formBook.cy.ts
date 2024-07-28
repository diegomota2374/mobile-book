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
    it("go to form edit", () => {
      cy.visit("/");

      cy.get('[data-testid="edit-1"]').should("exist").click();

      cy.url().should(
        "include",
        `/book/%7B%22title%22:%22percy%20jackson%22,%22author%22:%22rick%20riordan%22,%22category%22:%22Aventura%22,%22id%22:%221%22%7D`
      );
    });

    it("pre-fills the form with existing book data", () => {
      cy.get('[data-testid="title"]').should("have.value", "percy jackson");
      cy.get('[data-testid="author"]').should("have.value", "rick riordan");
      cy.get('[data-testid="category"]').should("have.value", "Aventura");
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
