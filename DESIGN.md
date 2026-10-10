# John Pavulon

Polskojęzyczne portfolio autorskich interfejsów, stron i eksperymentów cyfrowych. Kierunek: grafit, ciepłe złoto, typografia redakcyjna i analogowy telewizor CRT. Kontakt: pavulonjohn@gmail.com.

## System wizualny

Źródło tokenów i wspólnych stylów: `src/styles.css`. Tło `oklch(0.175 0.007 255)`, powierzchnie 0.215 / 0.25 / 0.27, tekst `oklch(0.95 0.012 80)`, złoto `oklch(0.77 0.1 82)`, jasne złoto i fokus `oklch(0.84 0.095 84)`. Kolorowe akcenty pozostają oszczędne.

IBM Plex Serif buduje nagłówki, podpis marki i nazwy projektów; IBM Plex Sans obsługuje treść, nawigację i etykiety. Kursywa wyróżnia kluczową część nagłówka. Maksymalna szerokość kontenera 1400 px, margines `--gutter`, pionowy rytm `--section-y`, szerokość tekstu 62ch. Promienie 2 / 4 / 8 px. Powierzchnie są płaskie, z delikatnym obrysem.

## Telewizor i prace

`Television.tsx` składa oryginalną fotografię i rzeczywistą miniaturę projektu we wspólnym układzie współrzędnych SVG. Maska uwzględnia zaokrąglenie ekranu, a transformacja jego perspektywę. Delikatne linie i refleks szkła łączą obraz z fotografią. Bez iframe, wideo i ciężkich filtrów w hero.

Sześć numerowanych przycisków ręcznie zmienia kanał. Aktywny przycisk ma złotą powierzchnię i `aria-pressed`; ekran oraz podpis prowadzą do strony projektu. Brak automatycznego przewijania. Zmiana obrazu trwa 320 ms; ograniczenie ruchu wyłącza animację. Na mniejszych ekranach osobny kadr zachowuje proporcje TV, a przyciski mają minimum 44 px wysokości.

Katalog `src/data/portfolio.ts` zawiera 17 prac, z sześcioma wyróżnieniami: DEMIURG, BarthMoney, FinLux, BARTHY, AURA, Autopilot. Homepage: duża praca, cztery w dwóch kolumnach, duża praca; telefon: jedna kolumna. Archiwum `/projekty`: wyszukiwanie po nazwie i kategorii, osobne warianty. Miniatury w `public/work/covers` powstały z rzeczywistych podglądów HTML.

Oryginały w `wybrane` pozostają niezmienione; kopie w `public/work` zachowują nazwy oraz odnośniki. Treści demonstracyjne wewnątrz prac nie stanowią deklaracji o autorze portfolio. Portret jest opisany jako materiał kolekcji wizualnej.

## Interakcje i dostępność

Menu oraz showreel korzystają ze wspólnego dialogu Radix, z Escape, blokadą przewijania i powrotem fokusu. Wideo z lokalnych plików MP4 i WebM ma natywne kontrolki, stan ładowania, ponowienie i link do MP4. Zamknięcie usuwa odtwarzacz.

Strona projektu uruchamia iframe dopiero po kliknięciu. Sandbox pozwala na skrypty, formularze i nowe karty, bez `allow-same-origin`. Alternatywą jest pełny HTML otwierany osobno. Nieznany slug zwraca 404. Treści sekcji są domyślnie widoczne, także bez JavaScript i IntersectionObserver. CSS pozostaje importowany bezpośrednio w root oraz przez link URL w head.

## Podgląd lokalny

`npm run dev` uruchamia Vite. `npm run build` tworzy samodzielny serwer Node w `.output`; `npm run preview` uruchamia go pod adresem 127.0.0.1:4173. `PORT` lub `PORTFOLIO_PORT` zmienia port. Showreel znajduje się w `public/media` i działa bez pośrednika zewnętrznej platformy. Prace HTML zachowują własne zewnętrzne zależności.
