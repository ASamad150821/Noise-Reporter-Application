import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Start } from './pages/Start';
import { NoiseType } from './pages/NoiseType';
import { NoiseDetails } from './pages/NoiseDetails';
import { YourDetails } from './pages/YourDetails';
import { Confirmation } from './pages/Confirmation';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';


export default function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Start></Start>} />
            <Route path="/noise-type" element={<NoiseType></NoiseType>} />
            <Route path="/noise-details" element={<NoiseDetails></NoiseDetails>} />
            <Route path="/your-details" element={<YourDetails></YourDetails>} />
            <Route path="/confirmation" element={<Confirmation></Confirmation>} />
            <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
        </Layout>
    </BrowserRouter>
  );
}
