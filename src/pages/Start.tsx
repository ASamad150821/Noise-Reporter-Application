import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore } from '../store/useNoiseStore';

/*
 * The start page. Simplest possible React component:
 *   - renders some static text
 *   - has one button
 *   - when clicked, resets the store and navigates to the next page
 *
 * useNavigate gives you a function that changes the URL. That's all.
 * The <Routes> component in App.tsx reacts to the new URL and swaps
 * the page content.
 */

export function Start() {
  const navigate = useNavigate();
  const reset = useNoiseStore((state) => state.reset);

  const handleStart = () => {
    reset();
    navigate('/noise-type');
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Report noise in your area</h2>
      <p className="text-gray-700 mb-6">
        This short form helps us log a noise complaint. It takes about two
        minutes.
      </p>
      <Button onClick={handleStart}>Start report</Button>
    </div>
  );
}
