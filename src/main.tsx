import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

/*
 * This file is the entry point. It's the first code the browser runs.
 *
 * Three things happen here:
 *
 * 1. We create a TanStack QueryClient. This is the cache that stores
 *    the results of all server calls (useQuery / useMutation) across
 *    the app. There should be ONE per app, created once.
 *
 * 2. We find the <div id="root"> in index.html and tell React to
 *    render our <App /> inside it. This is the bridge from raw HTML
 *    into the React world.
 *
 * 3. We wrap <App /> in two providers:
 *    - <StrictMode>: a dev-only helper that double-invokes effects
 *      to help surface bugs. It does nothing in production.
 *    - <QueryClientProvider>: makes the query client available to any
 *      component deep in the tree that calls useQuery or useMutation.
 *
 *  Compare this to src/main.tsx in the real work app — same structure,
 *  but the real app also initialises Azure MSAL auth before rendering.
 */

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
