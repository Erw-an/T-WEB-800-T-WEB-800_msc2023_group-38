import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Index from "./index.svelte";

test("renders a index", async () => {
  render(Index);

  expect(screen.getByRole("section")).toHaveTextContent("Welcome");
});

test("triggers an event when clicked", () => {
  const { component } = render(Index);
  const callback = jest.fn();


  expect(callback).toHaveBeenCalled();
});