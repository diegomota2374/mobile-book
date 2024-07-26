import { render, screen } from "@testing-library/react-native";
import Loading from "./Loading";
import { renderRouter } from "expo-router/testing-library";

const loadingRoute = () => {
  const MockComponent = jest.fn(() => <Loading />);
  renderRouter({
    index: MockComponent,
    "../Loading": MockComponent,
  });
  expect(screen).toHavePathname("/");
};

describe("loading", () => {
  it("renders an activity indicator and text", () => {
    loadingRoute();

    expect(screen.getByTestId("activity-indicator")).toBeTruthy();

    expect(screen.getByText("Carregando...")).toBeTruthy();
  });
});
