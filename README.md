# John Pavulon — portfolio

Samodzielna aplikacja React + TypeScript, TanStack Start i Tailwind CSS. Nie wymaga edytora ani usług generowania aplikacji.

## Uruchomienie

Wymagane: Node.js 22.12 lub nowszy i npm.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Vite wypisuje adres serwera. Domyślny port: 5173.

## Produkcja

```sh
npm run build
npm run preview
```

Build tworzy `.output` z serwerem Node i zasobami publicznymi. Podgląd działa domyślnie pod `http://127.0.0.1:4173`; `PORT` lub `PORTFOLIO_PORT` zmienia port, `HOST` zmienia interfejs. Serwer produkcyjny można uruchomić przez `node .output/server/index.mjs`.

## Kontrola

```sh
npm test
npm run lint
npx tsc --noEmit
```

Showreel MP4 i WebM oraz podglądy projektów są częścią repozytorium. Odtwarzacz działa we wspólnym dialogu i jest usuwany po zamknięciu.

Publiczne portfolio nie wymaga `.env`. Opcjonalne integracje Supabase korzystają ze zmiennych pokazanych w `.env.example`. Sekrety przechowuj w lokalnym `.env` lub konfiguracji hostingu; nie dodawaj ich do Git.

## Konfiguracja środowiska Codex

Polecenie instalacji: `npm ci`. Polecenie uruchomienia: `npm run dev -- --host 0.0.0.0`. Gałąź wybrana w środowisku musi zawierać `package.json`, `package-lock.json`, `src` i `public`, a nie tylko ten dokument.
