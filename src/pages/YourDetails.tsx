import {YourDetailsInputField} from "../components/YourDetailsInputField";
import { Button } from '../components/Button';
import { useNavigate } from "react-router-dom";
import { useNoiseStore } from "../store/useNoiseStore";
import { ChangeEvent, useState } from "react";
import { yourDetailsSchema } from "../schemas/yourDetails";
import { ZodError } from "zod";
import { type YourDetails } from "../store/useNoiseStore";
import { useSubmitReport } from "../hooks/useSubmitReport";


type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'email', string>>;

export function YourDetails() {
<<<<<<< HEAD
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
=======

  let navigate = useNavigate();
  let [errors, setErrors] = useState<FieldErrors>({});
  
  let yourDetails = useNoiseStore((state) => state.yourDetails);
  let setYourDetails = useNoiseStore((state) => state.setYourDetails);
  let [localDetails, setLocalDetails] = useState({
    firstName: yourDetails.firstName,
    lastName: yourDetails.lastName,
    email: yourDetails.email,
  });

  let result =  useSubmitReport();
  let submit = result.mutate;
  let isPending = result.isPending;
  let noiseType = useNoiseStore((state) => state.noiseType);
  let howLong = useNoiseStore((state) => state.howLong);
  let description = useNoiseStore((state) => state.description);


function handleDetailsSubmission() {
    try {
      yourDetailsSchema.parse(localDetails);
      setYourDetails(localDetails);
>>>>>>> 2d98fc5 (Updated version of the Report It Application. Changes include adding a 404 not founderror message page.)
      submit({
        noiseType,
        howLong,
        description,
<<<<<<< HEAD
        ...yourDetails,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        // Convert the flat list of issues into a { field: message } map.
        const fieldErrors: FieldErrors = {};
        for (const issue of err.issues) {
          const field = issue.path[0] as keyof FieldErrors;
=======
        ...localDetails
      })
   } catch (error) {
      if (error instanceof ZodError) {
        let fieldErrors: FieldErrors = {};
        for (let issue of error.issues) {
          let field = issue.path[0] as keyof FieldErrors;
>>>>>>> 2d98fc5 (Updated version of the Report It Application. Changes include adding a 404 not founderror message page.)
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
      }
    }
<<<<<<< HEAD
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your details</h2>
=======
  }

function handleDetailsChange(event: ChangeEvent<HTMLInputElement>, field: keyof typeof localDetails) {
    console.log(localDetails)
    setLocalDetails({...localDetails, [field]: event.target.value});
    setErrors({...errors, [field]: undefined});
}

  return (

    <div>
      <h2 className="text-lg font-semibold mb-4">Your Details</h2>
>>>>>>> 2d98fc5 (Updated version of the Report It Application. Changes include adding a 404 not founderror message page.)
      <p className="text-sm text-gray-600 mb-4">
        We need these so we can contact you about the case.
      </p>

<<<<<<< HEAD
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
=======
      <YourDetailsInputField type="text" value={localDetails.firstName} onChange={(e) => handleDetailsChange(e, 'firstName')} error={errors.firstName}>First Name</YourDetailsInputField>
      <YourDetailsInputField type="text" value={localDetails.lastName} onChange={(e) => handleDetailsChange(e, 'lastName')} error={errors.lastName}>Last Name</YourDetailsInputField>
      <YourDetailsInputField type="text" value={localDetails.email} onChange={(e) => handleDetailsChange(e, 'email')} error={errors.email}>Email</YourDetailsInputField>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => navigate('/noise-details')} disabled={isPending}>Back</Button>
        <Button onClick={handleDetailsSubmission} disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>

    </div>

  )
}






>>>>>>> 2d98fc5 (Updated version of the Report It Application. Changes include adding a 404 not founderror message page.)
