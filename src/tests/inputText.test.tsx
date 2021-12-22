import { unmountComponentAtNode } from "react-dom";
import { act, create } from "react-test-renderer";
import InputText from "../elements/inputText/inputText";

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
    const mockType = "text";
    const mockPlaceholder = "Test placeholder";
    const mockLabel = "Test label";
    const mockName = "Test name";
    const mockValue = "Test value";
    const mockOnChangeFunction = jest.fn();
    const mockOnBlurFunction = jest.fn();

    const component = create(
      <InputText
        onChange={mockOnChangeFunction}
        type={mockType}
        placeholder={mockPlaceholder}
        label={mockLabel}
        name={mockName}
        value={mockValue}
        onBlur={mockOnBlurFunction}
      />
    );
    const instance = component.root;
    const label = instance.findByType("label");
    const element = instance.findByType("input");

    expect(label.props.className.includes("labelText")).toBeTruthy();

    expect(element.props.className.includes("inputText")).toBeTruthy();
    expect(element.props.type.includes(mockType)).toBeTruthy();
    expect(element.props.value.includes(mockValue)).toBeTruthy();
    expect(element.props.placeholder.includes(mockPlaceholder)).toBeTruthy();
    expect(element.props.name.includes(mockName)).toBeTruthy();

    act(() => {
      element.props.onChange();
    });
    expect(mockOnChangeFunction.mock.calls.length).toBe(1);

    act(() => {
      element.props.onBlur();
    });
    expect(mockOnBlurFunction.mock.calls.length).toBe(1);
  });
});
