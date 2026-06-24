import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/*
 * Zustand store — this is the global state shared across all pages.
 *
 * Why? Because the user enters `noiseType` on page 2 but we need it
 * on page 5 when submitting. React's own useState is per-component,
 * so it can't bridge across page navigations.
 *
 * Why Zustand and not React Context? Context is fine for small/slow-
 * changing state (like the current theme), but it re-renders every
 * consumer on every change. Zustand gives you cheap, selective
 * subscriptions. It's also much less boilerplate than Redux.
 *
 * `persist` middleware writes the state to localStorage automatically,
 * so refreshing the browser doesn't lose the user's progress.
 *
 * --- Differences from the real work app ---
 *
 * The real app uses the "slice pattern": splits the store into
 *   createNoiseDetailsSlice
 *   createNoiseLocationSlice
 *   createYourDetailsSlice
 * and merges them in store.ts. That's good practice once the store
 * gets large. We keep it in one file here for simplicity.
 */

export type NoiseType = 'music' | 'construction' | 'shouting' | 'other' | '';

export type YourDetails = {
  firstName: string;
  lastName: string;
  email: string;
};

const emptyDetails: YourDetails = { firstName: '', lastName: '', email: '' };

type NoiseStore = {
  noiseType: NoiseType;
  howLong: string;
  description: string;
  yourDetails: YourDetails;
  caseReference: string;

  setNoiseType: (t: NoiseType) => void;
  setHowLong: (h: string) => void;
  setDescription: (d: string) => void;
  setYourDetails: (d: YourDetails) => void;
  setCaseReference: (ref: string) => void;
  reset: () => void;
};


export const useNoiseStore = create<NoiseStore>()(
  persist( 
    (set) => ({
      noiseType: '',
      howLong: '',
      description: '',
      yourDetails: emptyDetails,
      caseReference: '',

      setNoiseType: (noiseType) => set({ noiseType}),
      setHowLong: (howLong) => set({ howLong }),
      setDescription: (description) => set({ description }),
      setYourDetails: (yourDetails) => set({ yourDetails }),
      setCaseReference: (caseReference) => set({ caseReference }),
      reset: () =>
        set({
          noiseType: '',
          howLong: '',
          description: '',
          yourDetails: emptyDetails,
          caseReference: '',
        }),
    }),
    { name: 'mini-noise-reporter-storage' },
  ),
);
