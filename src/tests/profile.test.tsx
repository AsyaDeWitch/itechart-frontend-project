// import React from "react";
import { /* render, */ unmountComponentAtNode } from "react-dom";
// import Profile from "@/components/users/profile";

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

test("Fake test", () => {
  expect(true).toBeTruthy();
});
