import { useNavigate } from "react-router-dom";
import { useNoiseStore, YourDetails } from "../store/useNoiseStore";
import { useMutation } from "@tanstack/react-query";

type ReportResponse = { caseReference : string }

async function submitReport(yourDetails : YourDetails) : Promise<ReportResponse> {

  const { noiseType, description, howLong } = useNoiseStore.getState();

  const res = await fetch('/api/SubmitCase', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ noiseType, howLong, description, ...yourDetails})
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
}


export function useSubmitReport() {
    let navigate = useNavigate();
    let reset = useNoiseStore((state) => state.reset);
    let setcaseReference = useNoiseStore((state) => state.setCaseReference);

    return useMutation({
        mutationFn: submitReport,
        onSuccess: (response) => {
          reset();
          setcaseReference(response.caseReference);
          navigate('/confirmation');
        },
        onError: (error) => {
          console.error('Submit failed:', error);
          navigate('/*')
        }
    })
}
