import heroTv from "@/assets/hero-tv-hotel.jpg";
import showreel from "@/assets/portfolio-showreel.mp4.asset.json";
import showreelWebm from "@/assets/portfolio-showreel.webm.asset.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { contactHref, featuredProjects } from "@/data/portfolio";
import { Television, TelevisionControls } from "./Television";

export function Hero() {
  const [projectIndex, setProjectIndex] = useState(0);
  const currentProject = featuredProjects[projectIndex]!;
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoAttempt, setVideoAttempt] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);
  const openShowreel = () => {
    setVideoError(false);
    setVideoLoading(true);
    setShowreelOpen(true);
  };
  return (
    <section
      id="top"
      className="relative isolate lg:min-h-[80svh] overflow-hidden border-b border-border bg-background"
    >
      <div className="television-desktop hidden lg:block">
        <Television project={currentProject} />
      </div>
      <div className="hero-fade pointer-events-none absolute inset-0 -z-10" />
      <div className="vignette pointer-events-none absolute inset-0 -z-10" />

      {/* Screen overlay (desktop) */}
      <div className="tv-desktop-panel hidden lg:block">
        <TelevisionControls index={projectIndex} onSelect={setProjectIndex} />
        <Button
          type="button"
          variant="ghost"
          onClick={openShowreel}
          className="mt-4 gap-2 px-0 text-xs text-muted-foreground hover:bg-transparent hover:text-gold-bright"
          aria-label="Odtwórz showreel"
        >
          <Play aria-hidden className="size-4" /> Odtwórz showreel
        </Button>
      </div>

      <div className="hero-copy container-ed flex flex-col justify-center pb-12 pt-28 lg:min-h-[80svh] lg:pb-16 lg:pt-32">
        <p className="label-ed animate-in fade-in slide-in-from-bottom-2 duration-1000">
          John Pavulon / Portfolio
        </p>
        <h1 className="hero-heading mt-7 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Projektuję cyfrowe doświadczenia <span className="gold-italic">z charakterem.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted-foreground animate-in fade-in duration-700">
          Autorskie interfejsy, strony i eksperymenty cyfrowe. Zobacz wybrane prace i porozmawiajmy
          o Twoim projekcie.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Button asChild className="group" size="lg">
            <a href={contactHref}>
              Rozpocznij projekt{" "}
              <ArrowUpRight
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </Button>
          <Button asChild variant="link" className="px-0 text-foreground">
            <a href="#work">
              Zobacz realizacje <ArrowDown aria-hidden />
            </a>
          </Button>
        </div>
        <figure className="tv-mobile mt-10 lg:hidden">
          <div className="tv-mobile-scene">
            <Television project={currentProject} mobile />
          </div>
          <figcaption className="tv-mobile-caption">
            <TelevisionControls index={projectIndex} onSelect={setProjectIndex} />
            <Button
              type="button"
              variant="ghost"
              onClick={openShowreel}
              className="mt-4 gap-2 px-0 text-xs text-muted-foreground hover:bg-transparent hover:text-gold-bright"
              aria-label="Odtwórz showreel"
            >
              <Play aria-hidden className="size-4" /> Odtwórz showreel
            </Button>
          </figcaption>
        </figure>
      </div>
      <Dialog open={showreelOpen} onOpenChange={setShowreelOpen}>
        <DialogContent className="w-[94vw] max-w-[1200px] max-h-[92dvh] gap-3 overflow-y-auto p-4 pt-12 sm:p-6 sm:pt-12">
          <DialogTitle className="font-display text-2xl">John Pavulon — showreel</DialogTitle>
          <DialogDescription className="sr-only">Film z kolekcji portfolio</DialogDescription>
          {showreelOpen && (
            <video
              key={videoAttempt}
              poster={heroTv}
              controls
              autoPlay
              playsInline
              preload="auto"
              aria-label="Showreel portfolio"
              className="aspect-video max-h-[65svh] w-full bg-background object-contain"
              onError={() => {
                setVideoError(true);
                setVideoLoading(false);
              }}
              onLoadedData={() => {
                setVideoError(false);
                setVideoLoading(false);
              }}
              onPlaying={() => {
                setVideoError(false);
                setVideoLoading(false);
              }}
            >
              <source src={showreelWebm.url} type="video/webm" />
              <source src={showreel.url} type="video/mp4" />
            </video>
          )}
          {videoLoading && !videoError && (
            <p role="status" className="text-sm text-muted-foreground">
              Ładowanie filmu…
            </p>
          )}
          {videoError && (
            <div className="flex flex-wrap items-center gap-4">
              <p role="alert" className="text-sm text-muted-foreground">
                Nie udało się załadować filmu.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setVideoError(false);
                  setVideoLoading(true);
                  setVideoAttempt((attempt) => attempt + 1);
                }}
              >
                Spróbuj ponownie
              </Button>
            </div>
          )}
          <a
            href={showreel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-link text-sm text-gold"
          >
            Otwórz film MP4 osobno
          </a>
        </DialogContent>
      </Dialog>
    </section>
  );
}
