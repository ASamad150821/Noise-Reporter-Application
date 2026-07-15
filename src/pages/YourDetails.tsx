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
      submit({
        noiseType,
        howLong,
        description,
        ...localDetails
      })
   } catch (error) {
      if (error instanceof ZodError) {
        let fieldErrors: FieldErrors = {};
        for (let issue of error.issues) {
          let field = issue.path[0] as keyof FieldErrors;
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
      }
    }
  }

function handleDetailsChange(event: ChangeEvent<HTMLInputElement>, field: keyof typeof localDetails) {
    console.log(localDetails)
    setLocalDetails({...localDetails, [field]: event.target.value});
    setErrors({...errors, [field]: undefined});
}

  return (

    <div>
      <h2 className="text-lg font-semibold mb-4">Your Details</h2>
      <p className="text-sm text-gray-600 mb-4">
        We need these so we can contact you about the case.
      </p>

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






