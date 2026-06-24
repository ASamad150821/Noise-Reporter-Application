import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore, NoiseType as NoiseTypeValue } from '../store/useNoiseStore';

/*
 * First "real" form page. The user picks a radio option.
 *
 * KEY CONCEPT — controlled inputs:
 *
 * The radio inputs don't keep their own state. Instead we read the
 * selected value from the Zustand store and write back to the store
 * whenever the user changes the selection. Every character/click
 * round-trips through state.
 *
 * That pattern is what makes multi-page forms work: because the value
 * lives in the store, it's still there after the user navigates away
 * and comes back.
 */

const OPTIONS: { value: NoiseTypeValue; label: string }[] = [
  { value: 'music', label: 'Loud music' },
  { value: 'construction', label: 'Construction' },
  { value: 'shouting', label: 'Shouting / arguing' },
  { value: 'other', label: 'Something else' },
];

export function NoiseType() {
  const navigate = useNavigate();
  const noiseType = useNoiseStore((state) => state.noiseType);
  const setNoiseType = useNoiseStore((state) => state.setNoiseType);

  const canContinue = noiseType !== '';

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">What kind of noise is it?</h2>

      <fieldset className="space-y-2 mb-6">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="noiseType"
              value={opt.value}
              checked={noiseType === opt.value}
              onChange={(e) => setNoiseType(e.target.value as NoiseTypeValue)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button
          onClick={() => navigate('/noise-details')}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
