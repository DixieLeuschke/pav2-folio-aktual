import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Sections";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProjects } from "@/data/portfolio";

export const Route = createFileRoute("/projekty/")({
  head: () => ({
    meta: [
      { title: "Archiwum prac — John Pavulon" },
      {
        name: "description",
        content:
          "17 autorskich prac, warianty interfejsów i eksperymenty cyfrowe. Przeglądaj projekty John Pavulon.",
      },
      { property: "og:title", content: "Archiwum prac — John Pavulon" },
    ],
  }),
  component: Archive,
});

function Archive() {
  const [query, setQuery] = useState("");
  const results = searchProjects(query);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="container-ed">
        <div className="page-intro">
          <p className="text-sm text-gold">John Pavulon / Archiwum</p>
          <h1 className="display-xl mt-6">
            Każdy projekt.
            <br />
            <span className="gold-italic">Własna perspektywa.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Prace, warianty i eksperymenty w jednym miejscu. Otwórz projekt, żeby zobaczyć jego
            pełny interfejs.
          </p>
          <div className="mt-10 max-w-xl">
            <label htmlFor="project-search" className="mb-3 block text-sm">
              Szukaj po nazwie lub kategorii
            </label>
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
              />
              <Input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Np. FinLux, interfejs, landing page"
                className="pl-10"
              />
            </div>
            <p role="status" aria-live="polite" className="mt-3 text-sm text-muted-foreground">
              Liczba prac: {results.length} / 17
            </p>
          </div>
        </div>
        {results.length ? (
          <div className="archive-grid">
            {results.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="pb-24">
            <h2 className="font-display text-3xl">Brak pasujących prac</h2>
            <p className="mt-4 text-muted-foreground">Spróbuj innej nazwy lub kategorii.</p>
            <Button variant="outline" className="mt-6" onClick={() => setQuery("")}>
              Wyczyść wyszukiwanie
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
