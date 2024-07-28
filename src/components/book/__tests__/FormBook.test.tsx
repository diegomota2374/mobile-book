import { fireEvent, waitFor, screen } from "@testing-library/react-native";
import FormeBook from "../FormBook";
import { renderRouter } from "expo-router/testing-library";
import axios from "axios";

//define mock expo-inking in teste jest
jest.mock("expo-linking", () => {
  const module: typeof import("expo-linking") = {
    ...jest.requireActual("expo-linking"),
    createURL: jest.fn(),
  };

  return module;
});

const initialBook = {
  id: 1,
  title: "Sample Book",
  author: "Sample Author",
  category: "Aventura",
};

//define route with expo-router
const formBookRoute = (Form?: string) => {
  const MockComponent = jest.fn(() => (
    <FormeBook initialBook={Form ? "Form" : initialBook} />
  ));
  renderRouter({
    index: MockComponent,
    "../book/form": MockComponent,
  });
  expect(screen);
};

describe("FormeBook", () => {
  it("renders correctly new form", () => {
    formBookRoute("Form");

    expect(screen.getByText("Título:"));
    expect(screen.getByText("Autor:"));
    expect(screen.getByText("Categoria:"));
    expect(screen.getByPlaceholderText("title"));
    expect(screen.getByPlaceholderText("author"));
  });

  it("renders correctly edit form", () => {
    formBookRoute();

    expect(screen.getByText("Título:"));
    expect(screen.getByText("Autor:"));
    expect(screen.getByText("Categoria:"));
    expect(screen.getByPlaceholderText("Sample Book"));
    expect(screen.getByPlaceholderText("Sample Author"));
  });

  it("displays errors if required fields are empty", async () => {
    formBookRoute("Form");

    fireEvent.press(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByText("O Título é obrigatório"));
      expect(screen.getByText("O Autor é obrigatório"));
      expect(screen.getByText("A Categoria é obrigatória"));
    });
  });

  it("submits form new data", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: {} });

    formBookRoute("Form");

    fireEvent.press(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(axios.post(`http://192.168.1.103:3000/books/${initialBook}`));
    });
  });

  it("submits form data edit", async () => {
    axios.put = jest.fn().mockResolvedValue({ data: {} });

    formBookRoute();

    fireEvent.press(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(
        axios.put(
          `http://192.168.1.103:3000/books/${initialBook.id}`,
          initialBook
        )
      );
    });
  });
});
