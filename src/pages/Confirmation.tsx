import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore } from '../store/useNoiseStore';

/*
 * The final page. We read the case reference from the store (it was
 * written there by the mutation's onSuccess callback) and display it.
 *
 * "Start a new report" resets the store and sends the user home.
 */

export function Confirmation() {
  const navigate = useNavigate();
  const { caseReference, reset } = useNoiseStore();

  const startNew = () => {
    reset();
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Report submitted</h2>
      <p className="text-gray-700 mb-4">
        Thanks — we've logged your complaint.
      </p>
      {caseReference && (
        <p className="bg-gray-100 border border-gray-200 rounded p-3 mb-6">
          Your case reference is{' '}
          <span className="font-mono font-semibold">{caseReference}</span>
        </p>
      )}
      <Button onClick={startNew}>Start a new report</Button>
    </div>
  );
}
