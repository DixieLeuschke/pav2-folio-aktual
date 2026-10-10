- Import the global stylesheet directly in the root route as well as linking its URL in the document head so Vite processes and includes Tailwind styles in every preview and production bundle.
- Play showreels in the shared accessible dialog using native video controls and media pointers to files in public/media; mount the video only while open so closing always stops playback.
- Keep portfolio styling centralized in semantic CSS tokens and shared editorial utilities; this lets palette, typography and spacing changes remain consistent across sections and UI primitives.
- Preserve portfolio content and media when applying a visual-reference document; reference project identities and unavailable HTML previews are not replacement content.

## Browser automation

- Use Microsoft Edge for UI tests, screenshots and browser interactions. Never auto-launch Brave or auto-connect to an arbitrary Chromium browser. Use Firefox only when the user explicitly requests it.
- Prefer the existing browser MCP when it exposes Microsoft Edge: select `edge` explicitly. If Edge is unavailable there, use `agent_browser_edge` MCP, which launches the installed msedge.exe. Do not substitute Brave or Chrome.
- For CLI automation, agent-browser has an Edge executable configured in ~/.agent-browser/config.json. When a workflow requires CDP attach, launch Edge with a dedicated automation profile and loopback debugging endpoint, then connect explicitly before navigating. Never attach to the user's Brave session.
- If explicitly using Playwright, select channel="msedge" (Playwright MCP: --browser=msedge); if using Puppeteer, set executablePath to the installed Edge executable. Preserve existing integrations and the Windows default browser.

## Cursor Cloud specific instructions

- Do not request Supabase or database secrets for the public portfolio. The variables in `.env.example` are optional and unused by `/` and `/projekty`.
- Cloud Agent VMs include Google Chrome, not Microsoft Edge. Use Chrome for browser checks in this environment. The Edge instructions above apply on the author's Windows machine.
- Canonical commands stay in `README.md`: `npm ci`, `npm run dev -- --host 0.0.0.0 --port 5173`, `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
