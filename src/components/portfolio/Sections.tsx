import { Link } from "@tanstack/react-router";
import portrait from "@/assets/about-portrait.jpg";
import { contactEmail, contactHref, expertise, process, featuredProjects } from "@/data/portfolio";
import { Reveal, SectionLabel } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Work() {
  return (
    <section id="work" className="container-ed section-y">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <SectionLabel index="01" title="Wybrane prace" />
          <h2 className="display-xl mt-6">
            Pomysły w <span className="gold-italic">praktyce.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Sześć różnych spojrzeń na cyfrową formę. Każdy projekt możesz obejrzeć z bliska.
        </p>
      </Reveal>
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} className={index === 0 || index === 5 ? "featured-wide" : ""}>
            <ProjectCard project={project} number={index + 1} />
          </Reveal>
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/projekty">
            Wszystkie prace <span className="text-gold">17</span>
            <ArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="container-ed section-y grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <SectionLabel index="02" title="O mnie" />
          <h2 className="display-xl mt-6">
            John Pavulon.
            <br />
            <span className="gold-italic">Własny punkt widzenia.</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
            <p>
              W moich pracach spotykają się interfejsy użytkowe i eksperymenty z cyfrową formą. Od
              ekranów finansowych po strony produktów — każdy temat wymaga własnego języka.
            </p>
            <p>
              To portfolio jest miejscem, w którym możesz zobaczyć te rozwiązania w działaniu,
              porównać warianty i znaleźć punkt wyjścia do rozmowy o swoim projekcie.
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-5">
          <figure>
            <img
              src={portrait}
              alt="Czarno-biały portret w materiałach portfolio"
              loading="lazy"
              width={1008}
              height={1312}
              className="aspect-[4/5] w-full rounded-lg border border-border object-cover grayscale"
            />
            <figcaption className="mt-4 text-xs text-muted-foreground">
              Kadr z kolekcji wizualnej portfolio
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
export function Expertise() {
  return (
    <section id="expertise" className="border-y border-border bg-surface">
      <div className="container-ed section-y">
        <Reveal>
          <SectionLabel index="03" title="Oferta" />
          <h2 className="display-xl mt-6">
            Od pomysłu do <span className="gold-italic">interfejsu.</span>
          </h2>
        </Reveal>
        <ul className="mt-14 border-t border-border">
          {expertise.map((item) => (
            <li key={item.title}>
              <Link to="/projekty/$slug" params={{ slug: item.slug }} className="offer-row group">
                <h3 className="font-display text-2xl md:text-4xl">{item.title}</h3>
                <span className="text-sm text-muted-foreground">{item.detail}</span>
                <span className="flex items-center gap-2 text-sm text-gold">
                  Zobacz przykład <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="process">
      <div className="container-ed section-y">
        <SectionLabel index="04" title="Współpraca" />
        <h2 className="display-xl mt-6">
          Jasny cel. <span className="gold-italic">Czytelny proces.</span>
        </h2>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0">
          {process.map((step, index) => (
            <li
              key={step.title}
              className={`md:px-10 ${index > 0 ? "md:border-l md:border-border" : "md:pl-0"}`}
            >
              <Reveal>
                <span className="font-display text-gold">0{index + 1}</span>
                <h3 className="mt-5 font-display text-3xl">{step.title}</h3>
                <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container-ed flex flex-col gap-6 border-t border-border py-10 md:flex-row md:items-center md:justify-between">
      <a href="/#top" className="wordmark gold-link">
        John Pavulon<span className="text-gold">.</span>
      </a>
      <Link to="/projekty" className="gold-link text-sm text-muted-foreground">
        Archiwum prac
      </Link>
      <span className="text-xs text-muted-foreground">© 2026 John Pavulon</span>
    </footer>
  );
}
export function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface">
      <div className="container-ed section-y">
        <Reveal>
          <SectionLabel index="05" title="Kontakt" />
          <h2 className="display-xl mt-8 max-w-[22ch]">
            Twój pomysł.
            <br />
            <span className="gold-italic">Porozmawiajmy o nim.</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            Napisz, co chcesz stworzyć, dla kogo i jaki cel ma spełniać projekt. To dobry początek.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <a href={contactHref}>
                Rozpocznij projekt <ArrowUpRight aria-hidden />
              </a>
            </Button>
            <a href={contactHref} className="contact-email gold-link text-muted-foreground">
              {contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
      <Footer />
    </section>
  );
}
