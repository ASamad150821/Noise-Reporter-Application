import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const stepOrder = [
  { path: '/', label: 'Start' },
  { path: '/noise-type', label: 'Noise type' },
  { path: '/noise-details', label: 'Noise details' },
  { path: '/your-details', label: 'Your details' },
  { path: '/confirmation', label: 'Confirmation' },
];

export function Layout({children} : LayoutProps) {
   
    const { pathname } = useLocation();
    const stepIndex = stepOrder.findIndex((s) => s.path === pathname);
    const currentStep = stepIndex === -1 ? null : stepOrder[stepIndex]; //Extracts out an object with the current step's path and label, or null if the current path isn't in stepOrder.
   
    return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Mini Noise Reporter
        </h1>
      </header>

      <main className="max-w-2xl mx-auto p-6">
        {currentStep ? 
          <p className="text-sm text-gray-500 mb-4">
            Step {stepIndex + 1} of {stepOrder.length} -
            <span className="font-medium text-gray-700">
              {currentStep.label}
            </span>
          </p>
          : null}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>
    </div>
    )
}
