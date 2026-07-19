import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore, NoiseType as NoiseTypeValue } from '../store/useNoiseStore';


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

  return (
    <div>
      <fieldset className="space-y-2 mb-6">
        <legend className="text-lg font-semibold mb-4">What kind of noise is it?</legend>
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
          disabled={noiseType == ""}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
