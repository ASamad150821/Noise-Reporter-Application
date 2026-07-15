import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useNoiseStore } from '../store/useNoiseStore';


const DURATIONS = [
  { value: 'under-hour', label: 'Less than an hour' },
  { value: 'hours', label: 'A few hours' },
  { value: 'days', label: 'Several days' },
  { value: 'weeks', label: 'Weeks or longer' },
];

export function NoiseDetails() {
  const navigate = useNavigate();
  const { howLong, description, setHowLong, setDescription } = useNoiseStore();

  const canContinue = howLong !== '' && description.trim().length > 0;

  const onHowLongChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setHowLong(e.target.value);
    console.log(howLong)
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tell us more about it</h2>

      <label className="block mb-4">
        <span className="block text-sm font-medium mb-1">
          How long has it been happening?
        </span>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={howLong}
          onChange={onHowLongChange}
        >
          <option value="">Choose an option</option>
          {DURATIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-6">
        <span className="block text-sm font-medium mb-1">
          Describe the noise
        </span>
        <textarea
          className="w-full border border-gray-300 rounded p-2 h-32"
          value={description}
          onChange={onDescriptionChange}
          placeholder="E.g. bass music from a flat above, every night after 11pm"
        />
      </label>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => navigate('/noise-type')}>
          Back
        </Button>
        <Button
          onClick={() => navigate('/your-details')}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
