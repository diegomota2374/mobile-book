import { fireEvent, render } from "@testing-library/react-native";
import FloatingButton from "./FloatingButton";

describe("FloatingButtonProps", () => {
  it("renders correctly and responds to press events", () => {
    const handlePress = jest.fn();

    const { getByTestId } = render(<FloatingButton onPress={handlePress} />);

    const button = getByTestId("floating-button");

    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
