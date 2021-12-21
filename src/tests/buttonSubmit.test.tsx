import { unmountComponentAtNode } from "react-dom";
import { act, create } from "react-test-renderer";
import ButtonSubmit from "../elements/buttonSubmit/buttonSubmit";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Submit button", () => {
  test("onClick prop should be called", () => {
    const mockOnClickFunction = jest.fn();
    const component = create(<ButtonSubmit onClick={mockOnClickFunction} />);
    const instance = component.root;

    const element = instance.findByType("button");

    expect(element.props.className.includes("buttonSubmit")).toBeTruthy();

    act(() => {
      element.props.onClick();
    });
    expect(mockOnClickFunction.mock.calls.length).toBe(1);
  });
});
