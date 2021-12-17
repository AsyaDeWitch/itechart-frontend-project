import { /* render,*/ unmountComponentAtNode } from "react-dom";
import TestRenderer from "react-test-renderer";
// import { act } from "react-dom/test-utils";
import CategoryCardsContainer from "../components/home/categoryCards/categoryCardsContainer";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
  // container = null;
});

/* test("renders about page", () => {
  render(<About />);
  const linkElement = screen.getByText(/About page/i);
  expect(linkElement).toBeInTheDocument();
}); */

test("renders about page", () => {
  // act(() => {
  // renderer(<About />, container);
  // const testRenderer = TestRenderer.create(<About />);
  const testRenderer = TestRenderer.create(<CategoryCardsContainer />);
  const testInstance = testRenderer.root;
  // });
  const element = testInstance.findByType("ul");
  expect(element.props.className.includes("category__cards-container")).toBeTruthy();
  // expect(container.textContent).toBe("About page");
  // expect(testInstance.findByType("h2")).toBe(["About page"]);
});

test("Fake test", () => {
  expect(true).toBeTruthy();
});
