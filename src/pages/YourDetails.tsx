import { Button } from '../components/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useNoiseStore } from "../store/useNoiseStore";
import { useState } from "react";
import { yourDetailsSchema } from "../schemas/yourDetails";
import { ZodError } from "zod";
import { type YourDetails } from "../store/useNoiseStore";
import { YourDetailsInputField } from '../components/YourDetailsInputField';

type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'email', string>>;

export function YourDetails() {

  let [errors, setErrors] = useState<FieldErrors>({});
  let navigate = useNavigate();
  
  let yourDetails = useNoiseStore((state) => state.yourDetails);
  let setYourDetails = useNoiseStore((state) => state.setYourDetails);
  let [localDetails, setLocalDetails] = useState({
    firstName: yourDetails.firstName,
    lastName: yourDetails.lastName,
    email: yourDetails.email,
  });

  let {howLong, description, noiseType} = useNoiseStore.getState();

  if(!howLong || !description || !noiseType) {
    return <Navigate to="/" replace></Navigate>
  }

  const canContinue = localDetails.firstName !== "" && localDetails.lastName !== "" && localDetails.email !== "";

  function handleSubmissionToSummaryPage() {
      try{
        const parsed =  yourDetailsSchema.parse(localDetails);
        setYourDetails(parsed);
        navigate('/summary')
      }
      catch (error) {
        if(error instanceof ZodError) {
          let fieldErrors : FieldErrors = {}
          for (let issue of error.issues) {
            let field = issue.path[0] as keyof FieldErrors;
            if(!fieldErrors[field]) {
            fieldErrors[field] = issue.message
            }
          }
          setErrors(fieldErrors)
        }
      }
  }

  function handleDetailsChange(field: keyof typeof localDetails, value: string) {
    setLocalDetails({...localDetails, [field] : value})
    setErrors({...errors, [field] : undefined});
  }

  return (

    <div>
        <h2 className="text-lg font-semibold mb-4">Your Details</h2>
        <p className="text-sm text-gray-600 mb-4">We need these so we can contact you about the case.</p>

        <YourDetailsInputField field="firstName" value={localDetails.firstName} error={errors.firstName} onChange={handleDetailsChange}>First Name</YourDetailsInputField>
        <YourDetailsInputField field="lastName" value={localDetails.lastName} error={errors.lastName} onChange={handleDetailsChange}>Last Name</YourDetailsInputField>
        <YourDetailsInputField field="email" value={localDetails.email} error={errors.email} onChange={handleDetailsChange}>Email</YourDetailsInputField>

        <div className="flex justify-between">
          <Button variant="secondary" onClick={() => navigate('/noise-details')}>Back</Button>
          <Button variant="primary" onClick={handleSubmissionToSummaryPage} disabled={!canContinue}>Continue</Button>
        </div>
    </div>
    
  )

}