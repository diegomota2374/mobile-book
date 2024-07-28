import { render, screen } from "@testing-library/react-native";
import Loading from "./Loading";
import { renderRouter } from "expo-router/testing-library";

const loadingRoute = () => {
  const MockComponent = jest.fn(() => <Loading />);
  renderRouter({
    index: MockComponent,
    "../Loading": MockComponent,
  });
  expect(screen);
};

describe("loading", () => {
  it("renders an activity indicator and text", () => {
    loadingRoute();

    expect(screen.getByTestId("activity-indicator"));

    expect(screen.getByText("Carregando..."));
  });
});
