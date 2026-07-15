# Mini Noise Reporter

A simplified learning version of the Westminster `report-it-noise` app.
Same stack, fewer pages, no auth or CRM. Built so you can study it and tinker.

## Stack

- React 18 + TypeScript
- Vite (dev server + build tool)
- React Router (multi-page navigation)
- Zustand (global form state across pages)
- TanStack Query (submission + loading/error states)
- Zod (form validation)
- Tailwind CSS (styling)

## How to run it

```bash
cd _learning/mini-noise-reporter
npm install
npm run dev
```

Then open http://localhost:5173 in a browser.

## The user journey

1. **Start** — intro page, click "Start report"
2. **Noise type** — pick a type (music, construction, etc.)
3. **Noise details** — how long has it been happening + a description
4. **Your details** — name + email, validated with Zod
5. **Confirmation** — shows a fake case reference returned from a mocked submission
