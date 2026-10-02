import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore, NoiseType as NoiseTypeValue } from '../store/useNoiseStore';

export const OPTIONS : {value: NoiseTypeValue, label: string}[] = [
  {value: 'music', label: 'Loud Music'},
  {value: 'construction', label: 'Construction'},
  {value: 'shouting', label: 'Shouting / arguing'},
  {value: 'other', label: 'Something else'}
]

export function NoiseType() {
    const navigate = useNavigate();
    const noiseType = useNoiseStore((state) => state.noiseType);
    const setNoiseType = useNoiseStore((state) => state.setNoiseType);

    const canContinue = noiseType !== "";

    return (
      <div>
        <fieldset className="space-y-2 mb-6">
            <legend className="text-lg font-semibold mb-4">What kind of noise is it?</legend>
            {OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="noiseTypeOption" value={option.value} onChange={(event) => setNoiseType(event.target.value as NoiseTypeValue)} checked={noiseType===option.value}></input>
                <span>{option.label}</span>
              </label>
            ))}
        </fieldset>
        
        <div className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate("/")}>Back</Button>
            <Button variant="primary" onClick={() => navigate("/noise-details")} disabled={!canContinue}>Continue</Button>
        </div>
      </div>
    )
}