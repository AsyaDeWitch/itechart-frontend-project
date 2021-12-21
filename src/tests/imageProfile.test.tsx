import { /* render, */ unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import ImageProfile from "../components/users/elements/imageProfile/imageProfile";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Image profile", () => {
  test("Snapshot test should be the same with previous version", () => {
    const mockImage64 = "";

    const component = renderer.create(<ImageProfile image64={mockImage64} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
