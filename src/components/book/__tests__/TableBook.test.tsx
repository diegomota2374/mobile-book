import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import TableBook from "../TableBook";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderRouter } from "expo-router/testing-library";
import { router } from "expo-router";

const mock = new MockAdapter(axios);

const mockBooks = [
  { id: 1, title: "Book 1", author: "Author 1", category: "Category 1" },
  { id: 2, title: "Book 2", author: "Author 2", category: "Category 2" },
];

const httpBook = "http://192.168.1.103:3000/books";

beforeEach(() => {
  mock.onGet(httpBook).reply(200, mockBooks);
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
    mock.onGet(httpBook).reply(500, mockBooks);

    tableBookRoute();

    await waitFor(() => {
      expect(
        screen.getByText(
          "Erro ao buscar livros. Verifique sua conexão de rede."
        )
      ).toBeTruthy();
    });
  });

  it("should open confirmation modal on delete button press", async () => {
    mock.onGet(httpBook).reply(200, mockBooks);
    mock.onDelete(`${httpBook}/1`).reply(200);

    tableBookRoute();

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("delete-1"));
      expect(
        screen.getByText("Tem certeza de que deseja excluir este livro?")
      ).toBeTruthy();
    });
  });

  it("should delete book when confirm delete is pressed", async () => {
    mock.onGet(httpBook).reply(200, mockBooks);

    tableBookRoute();

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("delete-1"));
    });

    fireEvent.press(screen.getByText("Confirmar"));

    await waitFor(() => {
      expect(mock.onDelete(` ${httpBook}/1`).reply(200));
      expect(screen.queryByText("Book One")).toBeNull();
    });
  });

  test("should navigate to add book screen when floating button is pressed", async () => {
    mock.onGet(httpBook).reply(200, mockBooks);

    tableBookRoute();

    jest.mock("expo-router", () => ({
      router: {
        navigate: jest.fn(),
      },
    }));

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("floatingButton"));
    });
    expect(router.navigate).toHaveBeenCalledWith("/book/form");
  });
});
