import { fireEvent, screen } from "@testing-library/react-native";
import ConfirmationModal from "./ConfirmationModal";
import { renderRouter } from "expo-router/testing-library";

//define mock expo-inking in teste jest
jest.mock("expo-linking", () => {
  const module: typeof import("expo-linking") = {
    ...jest.requireActual("expo-linking"),
    createURL: jest.fn(),
  };

  return module;
});

//define route with expo-router
const ConfirmationMockRoute = () => {
  const MockComponent = jest.fn(() => (
    <ConfirmationModal
      visible={true}
      onConfirm={() => {}}
      onCancel={() => {}}
      message="Are you sure?"
    />
  ));
  renderRouter({
    index: MockComponent,
    "../TableBook": MockComponent,
  });
  expect(screen);
};

describe("ConfirmationModal", () => {
  it("renders correctly when visible", () => {
    ConfirmationMockRoute();

    expect(screen.getByText("Are you sure?"));
    expect(screen.getByText("Cancelar"));
    expect(screen.getByText("Confirmar"));
  });

  it("calls onConfirm when the Confirmar button is pressed", () => {
    const onConfirmMock = jest.fn();
    ConfirmationMockRoute();

    fireEvent.press(screen.getByText("Confirmar"));
    expect(onConfirmMock);
  });

  it("calls onCancel when the Cancelar button is pressed", () => {
    const onCancelMock = jest.fn();

    ConfirmationMockRoute();

    fireEvent.press(screen.getByText("Cancelar"));
    expect(onCancelMock);
  });
});
