import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About, Contact, Expertise, Process, Work } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John Pavulon — cyfrowe doświadczenia z charakterem" },
      {
        name: "description",
        content: "Autorskie interfejsy, strony i eksperymenty cyfrowe. Wybrane prace John Pavulon.",
      },
      { property: "og:title", content: "John Pavulon — portfolio" },
      {
        property: "og:description",
        content: "Cyfrowe doświadczenia z charakterem. Obejrzyj prace i porozmawiajmy o projekcie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Work />
        <About />
        <Expertise />
        <Process />
        <Contact />
      </main>
    </>
  );
}
