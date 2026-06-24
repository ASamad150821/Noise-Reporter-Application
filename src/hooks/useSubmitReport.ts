import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useNoiseStore } from '../store/useNoiseStore';

/*
 * This is a custom hook — a function that starts with `use` and calls
 * other hooks inside it. Custom hooks let you bundle React behaviour
 * (state, effects, mutations, navigation) into one reusable unit.
 *
 * This hook mirrors `useHandleSubmit.ts` in the real work app.
 *
 * --- What useMutation does ---
 *
 * useMutation wraps an async function (the "mutation function") and
 * gives you back:
 *   - mutate(): the function you call to trigger it
 *   - isPending: true while the request is in flight
 *   - isError / error: if it failed
 *   - data: the successful response
 *
 * The `onSuccess` and `onError` callbacks run after mutate completes.
 * That's where we store the result and navigate to the next page.
 *
 * In this mini-app, submitReport is faked with setTimeout so you don't
 * need a real backend. In your work app it POSTs to an Azure API.
 */

type ReportPayload = {
  noiseType: string;
  howLong: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
};

type SubmitResponse = {
  caseReference: string;
};

async function submitReport(payload: ReportPayload): Promise<SubmitResponse> {
  // Pretend to call a server. Resolve after 800ms with a fake case ref.
  // Swap this for a real `fetch()` call to see how the pattern scales.
  await new Promise((resolve) => setTimeout(resolve, 800));
  // eslint-disable-next-line no-console
  console.log('Would have submitted to the server:', payload);
  const caseReference = `NR-${Math.floor(Math.random() * 9000 + 1000)}`;
  return { caseReference };
}

export function useSubmitReport() {
  const navigate = useNavigate();
  const setCaseReference = useNoiseStore((state) => state.setCaseReference);

  return useMutation({
    mutationFn: submitReport,
    onSuccess: (data) => {
      setCaseReference(data.caseReference);
      navigate('/confirmation');
    },
    onError: (error) => {
      // In the real work app this would be sent to Sentry.
      // eslint-disable-next-line no-console
      console.error('Submit failed:', error);
      alert('Something went wrong submitting your report.');
    },
  });
}
