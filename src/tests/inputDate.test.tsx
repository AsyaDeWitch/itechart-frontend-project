import { unmountComponentAtNode } from "react-dom";
import { create } from "react-test-renderer";
import InputDate from "../components/products/elements/inputDate/inputDate";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Input text", () => {
  test("onChange and onBlur props should be called", () => {
    const mockValue = "";
    const mockLabel = "Creation date";
    const mockName = "dateCreated";
    const mockOnChangeFunction = jest.fn();
    const mockOnBlurFunction = jest.fn();

    const component = create(
      <InputDate
        onChange={mockOnChangeFunction}
        value={mockValue}
        label={mockLabel}
        name={mockName}
        onBlur={mockOnBlurFunction}
      />
    );
    const instance = component.root;
    const label = instance.findByType("label");
    const element = instance.findByType("input");

    expect(label.props.className.includes("labelText")).toBeTruthy();

    expect(element.props.className.includes("inputDate")).toBeTruthy();
    expect(element.props.value.includes(mockValue)).toBeTruthy();
    expect(element.props.name.includes(mockName)).toBeTruthy();

    element.props.onBlur();
    expect(mockOnBlurFunction.mock.calls.length).toBe(1);

    element.props.onChange();
    expect(mockOnChangeFunction.mock.calls.length).toBe(1);
  });
});
