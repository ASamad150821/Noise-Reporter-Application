import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Start } from './pages/Start';
import { NoiseType } from './pages/NoiseType';
import { NoiseDetails } from './pages/NoiseDetails';
import { YourDetails } from './pages/YourDetails';
import { Confirmation } from './pages/Confirmation';

/*
 * App defines the routing structure of the whole app.
 *
 * <BrowserRouter> listens for URL changes (back button, links, navigate
 * calls) and makes the current URL available to every component inside.
 *
 * <Routes> is a switcher — it picks ONE of its <Route> children to
 * render, based on the current URL.
 *
 * <Layout> wraps everything (header + step indicator + main content area).
 * Because it's inside <BrowserRouter> and outside <Routes>, it stays
 * mounted while the page inside it changes.
 *
 * The real work app's app.tsx looks almost exactly like this, with a few
 * more routes (NoiseLocation, ReporterLocation, error pages).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/noise-type" element={<NoiseType />} />
          <Route path="/noise-details" element={<NoiseDetails />} />
          <Route path="/your-details" element={<YourDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
