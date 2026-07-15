import { useNavigate } from "react-router-dom";
import { useNoiseStore } from "../store/useNoiseStore";
import { useMutation } from "@tanstack/react-query";

type ReportPayload = {
    noiseType : string,
    howLong : string,
    description: string,
    firstName: string,
    lastName: string,
    email: string
};

type SubmitResponse = {
    caseReference: string
};


async function submitReport(payload : ReportPayload) : Promise<SubmitResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Would have submitted to the server:', payload);
    const caseReference = `NR-${Math.floor(Math.random() * 9000 + 1000)}`;
    return { caseReference };
}

export function useSubmitReport() {
    let navigate = useNavigate();
    let setCaseReference = useNoiseStore((state) => state.setCaseReference);

    return useMutation({
        mutationFn: submitReport,
        onSuccess: (data) => {
          setCaseReference(data.caseReference);
          navigate('/confirmation');
        },
        onError: (error) => {
          console.error('Submit failed:', error);
          alert('Something went wrong submitting your report.');
        }
    })
}
