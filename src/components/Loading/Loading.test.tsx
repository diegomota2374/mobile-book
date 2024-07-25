import { render } from "@testing-library/react-native";
import Loading from "./Loading";

describe("Loading", () => {
  it("render component loading", () => {
    render(<Loading />);
  });
});
