import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { Button } from '../components/Button';
import { useNoiseStore } from '../store/useNoiseStore';
import { yourDetailsSchema } from '../schemas/yourDetails';
import { useSubmitReport } from '../hooks/useSubmitReport';

/*
 * THIS IS THE MOST INTERESTING PAGE. Read it carefully — it's the
 * closest analogue to the real work app's YourDetails.tsx.
 *
 * What's happening:
 *
 * 1. Controlled form inputs backed by the Zustand store. Every keystroke
 *    updates the store.
 *
 * 2. Local component state (useState) for field-level errors. We don't
 *    put errors in the global store because they're only relevant
 *    while this form is on screen.
 *
 * 3. Zod validation on submit. If the data is invalid, we catch the
 *    ZodError and set per-field error messages.
 *
 * 4. If valid, we call `submit()` — which is the TanStack useMutation
 *    function from our custom hook. Loading/error/navigation are all
 *    handled inside the hook.
 *
 * 5. `isPending` from the mutation is wired to the button's `disabled`
 *    and label. While the "request" is in flight the user can't double-
 *    submit and gets visual feedback.
 */

type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'email', string>>;

export function YourDetails() {
  const navigate = useNavigate();
  const { yourDetails, setYourDetails, noiseType, howLong, description } =
    useNoiseStore();
  const { mutate: submit, isPending } = useSubmitReport();
  const [errors, setErrors] = useState<FieldErrors>({});

  const onChange =
    (field: keyof typeof yourDetails) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setYourDetails({ ...yourDetails, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = () => {
    try {
      yourDetailsSchema.parse(yourDetails);
      // Valid — kick off the submission. onSuccess in the hook navigates
      // us to /confirmation.
      submit({
        noiseType,
        howLong,
        description,
        ...yourDetails,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        // Convert the flat list of issues into a { field: message } map.
        const fieldErrors: FieldErrors = {};
        for (const issue of err.issues) {
          const field = issue.path[0] as keyof FieldErrors;
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your details</h2>
      <p className="text-sm text-gray-600 mb-4">
        We need these so we can contact you about the case.
      </p>

      <Field
        label="First name"
        value={yourDetails.firstName}
        onChange={onChange('firstName')}
        error={errors.firstName}
      />
      <Field
        label="Last name"
        value={yourDetails.lastName}
        onChange={onChange('lastName')}
        error={errors.lastName}
      />
      <Field
        label="Email"
        type="email"
        value={yourDetails.email}
        onChange={onChange('email')}
        error={errors.email}
      />

      <div className="flex justify-between mt-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/noise-details')}
          disabled={isPending}
        >
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}

/*
 * Small private helper component. Because it's only used inside
 * YourDetails, it lives in the same file — no need to export it.
 */
type FieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function Field({ label, type = 'text', value, onChange, error }: FieldProps) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full border rounded p-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </label>
  );
}
