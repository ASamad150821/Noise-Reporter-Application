import { useNavigate } from "react-router-dom";
import { useNoiseStore } from "../store/useNoiseStore";
import { Button } from "../components/Button";

export function Confirmation() {
  let navigate = useNavigate();
  let reset = useNoiseStore((state) => state.reset);
  let caseReference = useNoiseStore((state) => state.caseReference);

  function startNew() {
    reset();
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Report submitted</h2>
      <p className="text-gray-700 mb-4">
        Thanks — we've logged your complaint.
      </p>
      {caseReference ? <p className="bg-gray-100 border border-gray-200 rounded p-3 mb-6">
          Your case reference is{' '}
          <span className="font-mono font-semibold">{caseReference}</span>
        </p> : ''}
      <Button onClick={startNew}>Start a new report</Button>
    </div>
  );
}
