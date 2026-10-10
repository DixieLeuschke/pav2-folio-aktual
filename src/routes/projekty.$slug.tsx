import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Play, X } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Sections";
import { Button } from "@/components/ui/button";
import { findProject, contactHref } from "@/data/portfolio";

export const Route = createFileRoute("/projekty/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.name}${loaderData.variant ? ` — ${loaderData.variant}` : ""} — John Pavulon`
          : "Nie znaleziono projektu — John Pavulon",
      },
      { name: "description", content: loaderData?.description ?? "Projekt nie jest dostępny." },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.name} — John Pavulon` : "John Pavulon",
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <ProjectContent key={project.slug} project={project} />;
}

function ProjectContent({ project }: { project: NonNullable<ReturnType<typeof findProject>> }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="container-ed">
        <div className="page-intro">
          <Link
            to="/projekty"
            className="gold-link inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" /> Wszystkie prace
          </Link>
          <p className="mt-8 text-sm text-gold">
            {project.category}
            {project.variant ? ` / ${project.variant}` : ""}
          </p>
          <h1 className="display-xl mt-4">{project.name}</h1>
          <p className="mt-6 max-w-[62ch] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Interaktywny podgląd projektu HTML. Dane i treści wewnątrz pracy należą do jej
            demonstracji.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => {
                setPreviewLoaded(false);
                setPreviewOpen((value) => !value);
              }}
            >
              {previewOpen ? <X aria-hidden /> : <Play aria-hidden />}
              {previewOpen ? "Zamknij podgląd" : "Uruchom podgląd"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={project.htmlPath} target="_blank" rel="noopener noreferrer">
                Otwórz osobno <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </div>
        </div>
        <div className="pb-12">
          {previewOpen ? (
            <div>
              <p role="status" className="mb-3 text-sm text-muted-foreground">
                {previewLoaded
                  ? "Podgląd otwarty. Jeśli nie działa poprawnie, użyj opcji „Otwórz osobno”."
                  : "Ładowanie podglądu…"}
              </p>
              <iframe
                title={`Interaktywny podgląd: ${project.name}`}
                src={`${project.htmlPath}?embed=1`}
                sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer"
                className="project-preview"
                onLoad={() => setPreviewLoaded(true)}
              />
            </div>
          ) : (
            <img
              src={project.thumbnail}
              alt={`Pełny kadr projektu ${project.name}`}
              width={1440}
              height={1000}
              className="w-full rounded-lg border border-border"
            />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-10">
          <p className="font-display text-2xl">Masz pomysł na własny projekt?</p>
          <Button asChild>
            <a href={contactHref}>
              Rozpocznij projekt <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
