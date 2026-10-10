export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  htmlPath: string;
  thumbnail: string;
  featured: boolean;
  variant?: string;
};
function project(
  slug: string,
  name: string,
  category: string,
  description: string,
  filename: string,
  featured = false,
  variant?: string,
): Project {
  return {
    slug,
    name,
    category,
    description,
    htmlPath: `/work/${filename}.html`,
    thumbnail: `/work/covers/${filename}.png`,
    featured,
    ...(variant ? { variant } : {}),
  };
}
export const projects: Project[] = [
  project(
    "demiurg",
    "DEMIURG",
    "Portfolio i kierunek wizualny",
    "Autorskie portfolio z organiczną kompozycją, stonowaną paletą i redakcyjną prezentacją projektów. Typografia i detale budują własny świat wizualny.",
    "samorost",
    true,
  ),
  project(
    "barthmoney",
    "BarthMoney",
    "Interfejs aplikacji finansowej",
    "Mobilny interfejs do przeglądania finansów, dodawania transakcji i rozmowy z asystentem. Projekt pokazuje hierarchię informacji oraz stany ekranów aplikacji.",
    "barth-money",
    true,
  ),
  project(
    "finlux",
    "FinLux",
    "Mobilny interfejs finansowy",
    "Ekran finansów osobistych z podsumowaniem budżetu, wskazówkami i dolną nawigacją. Układ porządkuje dane wokół codziennych decyzji użytkownika.",
    "finlux-home",
    true,
  ),
  project(
    "barthy",
    "BARTHY",
    "Landing page",
    "Strona prezentująca ofertę kreacji reklamowych. Duży nagłówek i sekcje produktowe prowadzą przez propozycję współpracy.",
    "barthy",
    true,
  ),
  project(
    "aura",
    "AURA",
    "Strona produktu technologicznego",
    "Prezentacja infrastruktury obliczeniowej z macierzą zasobów i sekcjami opisującymi produkt. Techniczny temat otrzymuje wyraźny rytm wizualny.",
    "aura-compute-matrix",
    true,
  ),
  project(
    "autopilot",
    "Autopilot",
    "Landing page produktu",
    "Landing page narzędzia do automatyzacji procesów inżynierskich. Zawiera prezentację działania, funkcje i odpowiedzi na pytania.",
    "landing-page-2",
    true,
  ),
  project(
    "demiurg-wariant",
    "DEMIURG",
    "Portfolio i kierunek wizualny",
    "Alternatywna kompozycja portfolio DEMIURG. Osobny plik pozwala porównać rozwiązania wizualne i interakcje.",
    "samorost2",
    false,
    "Wariant 02",
  ),
  project(
    "finlux-cashflow",
    "FinLux",
    "Mobilny interfejs finansowy",
    "Wariant ekranu finansowego skupiony na przepływie pieniędzy i czytelnej prezentacji danych.",
    "finlux-m3",
    false,
    "Cashflow",
  ),
  project(
    "nexura",
    "Nexura",
    "Landing page",
    "Wariant strony prezentującej kreacje reklamowe, z odrębną identyfikacją Nexura.",
    "nexura-high-impact-creatives-2",
    false,
    "Wariant kreacji reklamowych",
  ),
  project(
    "axiom",
    "Axiom",
    "Strona produktu technologicznego",
    "Strona infrastruktury Web3 z rozbudowaną typografią i prezentacją systemu technologicznego.",
    "next-gen-web3-infrastructure-2",
  ),
  project(
    "novaflow",
    "NovaFlow",
    "Interakcje i prezentacja produktu",
    "Wizualny opis działania NovaFlow. Sekcje techniczne i animacje przedstawiają przepływ procesu.",
    "how-novaflow-operates",
  ),
  project(
    "architektura-produktow",
    "Architektura produktów",
    "Portfolio i kierunek wizualny",
    "Strona przedstawiająca projektowanie produktów cyfrowych i systemy AI. Łączy ofertę z rozbudowanym układem redakcyjnym.",
    "alexander-landing",
  ),
  project(
    "core-framework",
    "Core Framework",
    "System wizualny",
    "Przegląd architektury frameworka w formie strony informacyjnej. Modułowy układ porządkuje zależności i części systemu.",
    "core-framework-overview",
  ),
  project(
    "studio",
    "Premium Studio",
    "Landing page",
    "Kompozycja strony studia oparta na kartach, typografii i prezentacji oferty.",
    "premium-studio-card-component",
  ),
  project(
    "saas-finance",
    "SaaS Finance",
    "Interfejs aplikacji finansowej",
    "Wizualna prezentacja platformy finansowej z elementami interfejsu i sceną przestrzenną.",
    "saas-finance-platform",
  ),
  project(
    "zloto-na-ciemnym",
    "Złoto na ciemnym tle",
    "System wizualny",
    "Krótka publikacja prezentująca zestawienie złotego akcentu z ciemną oprawą.",
    "blog-gold-on-dark",
  ),
  project(
    "hub-projektow",
    "Hub projektów",
    "Hub projektów",
    "Zbiorczy interfejs do przeglądania prac, wyszukiwania i filtrowania pozycji. Zachowuje odnośniki do powiązanych plików HTML.",
    "projekty-dashboard",
  ),
];
export const featuredProjects = projects.filter((item) => item.featured);
export const findProject = (slug: string) => projects.find((item) => item.slug === slug);
export function searchProjects(query: string) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l")
      .toLocaleLowerCase("pl");
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  return projects.filter((item) =>
    words.every((word) =>
      normalize(`${item.name} ${item.category} ${item.variant ?? ""}`).includes(word),
    ),
  );
}
export const expertise = [
  { title: "Strony i landing pages", detail: "Oferta, produkt, opowieść", slug: "barthy" },
  { title: "Interfejsy aplikacji", detail: "Finanse, dane, codzienne zadania", slug: "barthmoney" },
  { title: "Systemy wizualne", detail: "Typografia, kompozycja, charakter", slug: "demiurg" },
  { title: "Interakcje", detail: "Ruch, przepływ, prezentacja", slug: "novaflow" },
];
export const process = [
  {
    title: "Kierunek",
    text: "Rozmowa o celu, odbiorcach i zakresie. Punktem wyjścia jest jasny brief oraz wspólny kierunek projektu.",
  },
  {
    title: "Projekt",
    text: "Kompozycja, typografia i prototyp. Na tym etapie można zobaczyć rozwiązanie i sprawdzić kluczowe interakcje.",
  },
  {
    title: "Wdrożenie",
    text: "Przygotowanie strony, sprawdzenie różnych ekranów i przekazanie projektu wraz z ustalonymi materiałami.",
  },
];
export const navLinks = [
  { label: "Prace", href: "/#work" },
  { label: "O mnie", href: "/#about" },
  { label: "Oferta", href: "/#expertise" },
  { label: "Kontakt", href: "/#contact" },
];
export const contactEmail = "pavulonjohn@gmail.com";
export const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Zapytanie o projekt")}`;
