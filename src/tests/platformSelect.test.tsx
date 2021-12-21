import { unmountComponentAtNode } from "react-dom";
import { act, create, ReactTestInstance } from "react-test-renderer";
import PlatformSelect from "../components/cart/elements/platformSelect/platformSelect";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Platfrom select", () => {
  test("onChange prop should be called", () => {
    const mockValue = "";
    const mockPlatforms = [1, 2, 3];
    const mockOnChangeFunction = jest.fn();

    const component = create(
      <PlatformSelect onChange={mockOnChangeFunction} value={mockValue} platforms={mockPlatforms} />
    );
    const instance = component.root;
    const element = instance.findByType("select");

    expect(element.props.className.includes("platform-select")).toBeTruthy();
    expect(element.props.value.includes(mockValue)).toBeTruthy();

    expect(element.children.length).toBe(mockPlatforms.length);
    expect(
      element.children.map((child) => (child as ReactTestInstance).props.className.includes("platform-select__option"))
    ).toBeTruthy();

    act(() => {
      element.props.onChange();
    });
    expect(mockOnChangeFunction.mock.calls.length).toBe(1);
  });
});
