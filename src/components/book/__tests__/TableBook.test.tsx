import { screen, waitFor } from "@testing-library/react-native";
import TableBook from "../TableBook";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderRouter } from "expo-router/testing-library";

const mock = new MockAdapter(axios);

const mockBooks = [
  { id: 1, title: "Book 1", author: "Author 1", category: "Category 1" },
  { id: 2, title: "Book 2", author: "Author 2", category: "Category 2" },
];

beforeEach(() => {
  mock.onGet("http://192.168.1.103:3000/books").reply(200, mockBooks);
});

afterEach(() => {
  mock.reset();
});

//define route with expo-router
const tableBookRoute = () => {
  const MockComponent = jest.fn(() => <TableBook />);
  renderRouter({
    index: MockComponent,
    "../TableBook": MockComponent,
  });
  expect(screen).toHavePathname("/");
};

describe("TableBook", () => {
  it("renders correctly and displays a list of books", async () => {
    tableBookRoute();

    //checks if show element in screen
    await screen.findByText("Book 1");

    expect(screen.getByText("Lista de Livros")).toBeTruthy();
    expect(screen.getByText("Titulo")).toBeTruthy();
    expect(screen.getByText("Autor")).toBeTruthy();
    expect(screen.getByText("Categoria")).toBeTruthy();

    expect(screen.getByText("Book 1")).toBeTruthy();
    expect(screen.getByText("Author 1")).toBeTruthy();
    expect(screen.getByText("Category 1")).toBeTruthy();

    expect(screen.getByText("Book 2")).toBeTruthy();
    expect(screen.getByText("Author 2")).toBeTruthy();
    expect(screen.getByText("Category 2")).toBeTruthy();
  });

  it("should show error when failing to fetch books", async () => {
    mock.onGet("http://192.168.1.103:3000/books").reply(500, mockBooks);

    tableBookRoute();

    await waitFor(() => {
      expect(
        screen.getByText(
          "Erro ao buscar livros. Verifique sua conexão de rede."
        )
      ).toBeTruthy();
    });
  });
});
