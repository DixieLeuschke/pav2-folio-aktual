import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type Project } from "@/data/portfolio";

export function ProjectCard({ project, number }: { project: Project; number?: number }) {
  return (
    <article className="project-card">
      <Link
        to="/projekty/$slug"
        params={{ slug: project.slug }}
        className="project-cover group"
        aria-label={`Zobacz projekt ${project.name}${project.variant ? ` — ${project.variant}` : ""}`}
      >
        <img
          src={project.thumbnail}
          alt={`Podgląd projektu ${project.name}`}
          loading="lazy"
          width={1440}
          height={1000}
        />
        <span className="cover-action">
          <ArrowUpRight aria-hidden className="size-5" />
        </span>
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl md:text-4xl">
          <Link to="/projekty/$slug" params={{ slug: project.slug }} className="gold-link">
            {number && (
              <span className="mr-3 text-base text-gold">{String(number).padStart(2, "0")} /</span>
            )}
            {project.name}
          </Link>
        </h3>
        {project.variant && <span className="text-xs text-gold">{project.variant}</span>}
      </div>
      <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
        {project.category}
      </p>
    </article>
  );
}
