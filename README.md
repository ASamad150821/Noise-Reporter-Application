# Noise Reporter

A Noise Reporter Application

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

## Code map

```
src/
  main.tsx                 <- app entry: React root + QueryClientProvider
  App.tsx                  <- router setup + layout
  index.css                <- Tailwind directives
  components/
    Layout.tsx             <- shared page wrapper (header, step indicator)
    Button.tsx             <- reusable button
  pages/
    Start.tsx
    NoiseType.tsx
    NoiseDetails.tsx
    YourDetails.tsx        <- the most interesting page: Zod + useMutation
    Confirmation.tsx
  store/
    useNoiseStore.ts       <- Zustand store (like work app's store.ts)
  hooks/
    useSubmitReport.ts     <- TanStack useMutation (like useHandleSubmit)
  schemas/
    yourDetails.ts         <- Zod schema
```
