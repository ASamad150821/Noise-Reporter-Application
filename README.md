# Mini Noise Reporter

A simplified learning version of the Westminster `report-it-noise` app.
Same stack, fewer pages, no auth or CRM. Built so you can study it and tinker.

## Stack

Same as your work app (minus auth):
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

## How this maps to the real work app

| Mini app                      | Real work app                                 |
| ----------------------------- | --------------------------------------------- |
| `App.tsx`                     | `src/app/app.tsx`                             |
| `pages/Start.tsx`             | `src/app/components/pages/beforeYouStart/...` |
| `pages/NoiseType.tsx`         | `src/app/components/pages/noiseType/...`      |
| `pages/NoiseDetails.tsx`      | `src/app/components/pages/noiseDetails/...`   |
| `pages/YourDetails.tsx`       | `src/app/components/pages/yourDetails/...`    |
| `pages/Confirmation.tsx`      | `src/app/components/pages/confirmation/...`   |
| `store/useNoiseStore.ts`      | `src/store/store.ts` + slices                 |
| `hooks/useSubmitReport.ts`    | `src/hooks/useHandleSubmit.ts`                |
| `schemas/yourDetails.ts`      | `yourDetailsSchemaWithPhoneNumber` in utils   |

Things deliberately left out (for clarity): Azure B2C auth, Sentry,
Google Analytics, the atomic-design template layer (atoms/molecules/organisms),
and phone-number validation edge cases. Get comfortable here first, then
those will make sense in context.
