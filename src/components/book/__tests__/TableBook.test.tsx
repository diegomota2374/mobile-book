import { render } from "@testing-library/react-native";
import TableBook from "@/src/components/Book/TableBook";

describe("TableBook", () => {
  it("the component rendered", () => {
    const { debug } = render(<TableBook />);
    debug();
  });
});
