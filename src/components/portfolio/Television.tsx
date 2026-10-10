import { useId } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroTv from "@/assets/hero-tv-hotel.jpg";
import { featuredProjects, type Project } from "@/data/portfolio";

export function Television({ project, mobile = false }: { project: Project; mobile?: boolean }) {
  const screenId = useId().replace(/:/g, "");
  return (
    <svg
      viewBox={mobile ? "750 140 510 390" : "0 0 1376 768"}
      preserveAspectRatio="xMidYMid slice"
      className="television-scene"
      role="group"
      aria-label="Wybrane prace na ekranie telewizora CRT"
    >
      <defs>
        <clipPath id={`${screenId}-screen`}>
          <path d="M815 220 Q950 197 1092 209 Q1106 214 1106 330 Q1110 428 1095 451 Q942 470 797 452 Q787 446 794 345 Q796 251 815 220Z" />
        </clipPath>
        <pattern id={`${screenId}-lines`} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 1H4" stroke="#000" strokeOpacity=".18" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${screenId}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c7d9df" stopOpacity=".15" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <image href={heroTv} width="1376" height="768" aria-hidden="true" />
      <a
        href={`/projekty/${project.slug}`}
        aria-label={`Zobacz projekt ${project.name}`}
        className="tv-screen-link"
      >
        <g clipPath={`url(#${screenId}-screen)`}>
          <rect x="780" y="195" width="340" height="275" fill="#0e1215" />
          <image
            key={project.slug}
            href={project.thumbnail}
            width="320"
            height="258"
            transform="matrix(1,-.038,-.035,1,802,219)"
            preserveAspectRatio="xMidYMid slice"
            className="tv-project-image"
            aria-hidden="true"
          />
          <rect
            x="780"
            y="195"
            width="340"
            height="275"
            fill={`url(#${screenId}-lines)`}
            pointerEvents="none"
          />
          <rect
            x="780"
            y="195"
            width="340"
            height="275"
            fill={`url(#${screenId}-glass)`}
            pointerEvents="none"
          />
          <rect
            x="795"
            y="206"
            width="315"
            height="255"
            className="tv-screen-focus"
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth="6"
          />
        </g>
      </a>
    </svg>
  );
}

export function TelevisionControls({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (index: number) => void;
}) {
  const current = featuredProjects[index]!;
  return (
    <div className="television-controls">
      <p className="label-ed">Na ekranie / wybrane prace</p>
      <Link to="/projekty/$slug" params={{ slug: current.slug }} className="tv-project-title">
        <span>{current.name}</span>
        <ArrowUpRight aria-hidden className="size-4" />
      </Link>
      <div role="group" aria-label="Wybierz pracę na telewizorze" className="tv-channels">
        {featuredProjects.map((project, position) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Pokaż ${project.name} na telewizorze`}
            aria-pressed={position === index}
            onClick={() => onSelect(position)}
          >
            {String(position + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}
