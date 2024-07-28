describe("table book", () => {
  describe("Home screen", () => {
    it("should display a list of books", () => {
      cy.visit("/");

      cy.get("[data-testid=book-list]").should("exist");

      cy.get("[data-testid=book-item]").should("have.length.gt", 0);
    });

    it("should navigate to the edit page on edit button click", () => {
      cy.get("[data-testid^=edit-]").first().click();

      cy.url().should("include", "/book");
    });

    it("should open confirmation modal on delete button click", () => {
      cy.visit("/");

      cy.get("[data-testid^=delete-]").first().click();

      cy.contains("Tem certeza de que deseja excluir este livro?").should(
        "exist"
      );
    });

    it("should delete a book after confirming deletion", () => {
      cy.intercept("DELETE", "**/books/*", {
        statusCode: 200,
        body: {},
      }).as("deleteBook");

      cy.get("[data-testid^=delete-]").first().click();

      cy.get("[data-testid=confirm-delete-button]").click();

      cy.wait("@deleteBook");

      cy.get("[data-testid=book-item]").should("have.length.lt", 5);
    });

    it("should display an error message if there is an error fetching books", () => {
      cy.intercept("GET", "**/books", {
        statusCode: 500,
        body: {},
      }).as("fetchBooksError");

      cy.reload();

      cy.contains(
        "Erro ao buscar livros. Verifique sua conexão de rede."
      ).should("be.visible");
    });
  });
});
