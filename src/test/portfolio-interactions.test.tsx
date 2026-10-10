import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import {
  createRootRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from "@tanstack/react-router";

afterEach(cleanup);
describe("Dialogi portfolio", () => {
  it("zamyka menu przez Escape i przywraca fokus przyciskowi", async () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it("usuwa wideo po zamknięciu i pozwala ponowić ładowanie", async () => {
    const router = createRouter({
      routeTree: createRootRoute({ component: Hero }),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    await router.load();
    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getAllByRole("button", { name: "Odtwórz showreel" })[0]!);
    let video = screen.getByLabelText("Showreel portfolio");
    fireEvent.error(video);
    expect(screen.getByRole("alert")).toHaveTextContent("Nie udało się załadować filmu");
    fireEvent.click(screen.getByRole("button", { name: "Spróbuj ponownie" }));
    expect(screen.getByLabelText("Showreel portfolio")).not.toBe(video);
    video = screen.getByLabelText("Showreel portfolio");
    fireEvent.error(video);
    fireEvent.loadedData(video);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Zamknij" }));
    await waitFor(() =>
      expect(screen.queryByLabelText("Showreel portfolio")).not.toBeInTheDocument(),
    );
  });
});
