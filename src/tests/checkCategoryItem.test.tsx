import { unmountComponentAtNode } from "react-dom";
import { create } from "react-test-renderer";
import CheckCategoryItem from "../components/products/elements/checkCategoryItem/checkCategoryItem";
import CategoryItem from "../shared/categories/categoryItem";
import Categories from "../shared/categories/gameCategories";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Check category item", () => {
  test("onChange prop should be called", () => {
    const mockIsChecked = true;
    const mockCategoryItem: CategoryItem = Categories[0];
    const mockOnCheckedItemsUpdateFunction = jest.fn();

    const component = create(
      <CheckCategoryItem
        onCheckedItemsUpdate={mockOnCheckedItemsUpdateFunction}
        categoryItem={mockCategoryItem}
        isChecked={mockIsChecked}
      />
    );
    const instance = component.root;
    const label = instance.findByType("label");
    const element = instance.findByType("input");

    expect(label.props.className.includes("checkbox-label")).toBeTruthy();

    expect(element.props.className.includes("category-checkbox")).toBeTruthy();
    expect(element.props.type.includes("checkbox")).toBeTruthy();
    expect(element.props.checked === mockIsChecked).toBeTruthy();

    element.props.onChange();
    expect(mockOnCheckedItemsUpdateFunction.mock.calls.length).toBe(1);
  });
});
