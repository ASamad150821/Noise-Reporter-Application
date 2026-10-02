import { Navigate, useNavigate } from "react-router-dom";
import { useNoiseStore } from "../store/useNoiseStore";
import { Button } from "../components/Button";
import { useSubmitReport } from "../hooks/useSubmitReport";
import { OPTIONS } from './NoiseType'
import { DURATIONS } from "./NoiseDetails";

export function Summary() {
    
    let navigate = useNavigate();
    let { howLong, description, noiseType, yourDetails, caseReference } = useNoiseStore.getState();

    let result =  useSubmitReport();
    let submit = result.mutate;
    let isPending = result.isPending;
        
    if(!howLong || !description || !noiseType || !yourDetails.firstName || !yourDetails.lastName || !yourDetails.email || caseReference) {
        return <Navigate to="/" replace></Navigate>
    }


    function handleDetailsSubmission() {
        submit({
            noiseType : noiseType,
            howLong : howLong,
            description : description,
            ...yourDetails
        })
    }
         
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <p className="text-sm text-gray-600 mb-4">Please Confirm That These Details Are Correct</p>

            <div>
                <label className="flex justify-between">
                    <span>First Name</span>
                    {yourDetails.firstName}
                </label>
                <label className="flex justify-between">
                    <span>Last Name</span>
                    {yourDetails.lastName}
                </label>
                <label className="flex justify-between">
                    <span>Email</span>
                    {yourDetails.email}
                </label>
                {OPTIONS.map((option) => (
                    option.value === noiseType && 
                        <label key={option.value} className="flex justify-between">
                            <span>Noise Type</span>
                            {option.label}
                        </label>
                 ))}
                {DURATIONS.map((duration) => (
                    duration.value === howLong && 
                        <label key={duration.value} className="flex justify-between">
                            <span>Duration</span>
                            {duration.label}
                        </label>
                ))}
                <label className="flex justify-between">
                    <span>Description</span>
                    {description}
                </label>
            </div>

            <div className="flex justify-between">
                <Button variant="secondary" onClick={() => navigate('/your-details')}>Back</Button>
                <Button variant="primary" onClick={handleDetailsSubmission} disabled={isPending}>{isPending ? 'Submitting...' : 'Submit'}</Button>
            </div>
        </div>
    )
}