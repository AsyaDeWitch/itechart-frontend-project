import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import SearchBar from "../components/home/elements/searchBar/searchBar";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Search bar", () => {
  test("Snapshot test should be the same with previous version", () => {
    const mockOnChangeFunction = jest.fn();

    const component = renderer.create(<SearchBar onChange={mockOnChangeFunction} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
