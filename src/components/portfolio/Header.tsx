import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks, contactHref } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("scroll", update);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container-ed flex h-18 items-center justify-between gap-6">
        <a href="/#top" aria-label="John Pavulon — strona główna" className="wordmark">
          John{" "}
          <span>
            Pavulon<span className="text-gold">.</span>
          </span>
        </a>
        <nav aria-label="Nawigacja główna" className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="gold-link text-sm text-muted-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={contactHref} className="gold-link hidden text-sm text-gold lg:inline-flex">
          Rozpocznij projekt
        </a>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Otwórz menu"
              className="border border-border md:hidden"
            >
              <Menu aria-hidden />
            </Button>
          </DialogTrigger>
          <DialogContent className="mobile-menu">
            <DialogTitle className="wordmark">
              John Pavulon<span className="text-gold">.</span>
            </DialogTitle>
            <DialogDescription className="sr-only">Nawigacja portfolio</DialogDescription>
            <nav aria-label="Nawigacja mobilna">
              <ul className="mt-10 space-y-7">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-4xl gold-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={contactHref} className="gold-link mt-10 text-gold">
              Rozpocznij projekt
            </a>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
