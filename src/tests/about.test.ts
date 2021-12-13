import { /* render,*/ unmountComponentAtNode } from "react-dom";
// import TestRenderer from "react-test-renderer";
// import { act } from "react-dom/test-utils";
// import About from "@/components/about/about";

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

/* it("renders about page", () => {
  //act(() => {
  // renderer(<About />, container);
  const testRenderer = TestRenderer.create(<About />);
  //});
  expect(container.textContent).toBe("About page");
}); */

test("Fake test", () => {
  expect(true).toBeTruthy();
});
