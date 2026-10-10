import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import {
  contactHref,
  featuredProjects,
  findProject,
  projects,
  searchProjects,
} from "@/data/portfolio";

describe("Katalog własnych prac", () => {
  it("publikuje wszystkie pliki źródłowe bez zmiany zawartości", () => {
    const sourceFiles = readdirSync(resolve("wybrane")).filter((file) => file.endsWith(".html"));
    expect(projects).toHaveLength(17);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(17);
    expect(projects.map((project) => project.htmlPath.split("/").at(-1)).sort()).toEqual(
      sourceFiles.sort(),
    );
    for (const project of projects) {
      const filename = project.htmlPath.split("/").at(-1)!;
      const digest = (path: string) =>
        createHash("sha256").update(readFileSync(path)).digest("hex");
      expect(digest(resolve(`public${project.htmlPath}`))).toBe(
        digest(resolve("wybrane", filename)),
      );
      expect(existsSync(resolve(`public${project.thumbnail}`))).toBe(true);
    }
  });
  it("wyróżnia sześć uzgodnionych projektów we właściwej kolejności", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "demiurg",
      "barthmoney",
      "finlux",
      "barthy",
      "aura",
      "autopilot",
    ]);
  });
  it("wyszukuje nazwy, kategorie i warianty bez zależności od wielkości liter", () => {
    expect(searchProjects(" FINLUX ")).toHaveLength(2);
    expect(searchProjects("interfejs finansowy").map((project) => project.slug)).toContain(
      "finlux",
    );
    expect(searchProjects("zloto").map((project) => project.slug)).toEqual(["zloto-na-ciemnym"]);
    expect(searchProjects("wariant 02").map((project) => project.slug)).toEqual([
      "demiurg-wariant",
    ]);
    expect(searchProjects("nieistniejacy projekt")).toEqual([]);
    expect(searchProjects("")).toHaveLength(17);
  });
  it("nie podstawia projektu dla nieznanego adresu", () => {
    expect(findProject("brak-projektu")).toBeUndefined();
  });
  it("kieruje zapytanie na potwierdzony kontakt", () => {
    expect(contactHref).toBe("mailto:pavulonjohn@gmail.com?subject=Zapytanie%20o%20projekt");
  });
});
