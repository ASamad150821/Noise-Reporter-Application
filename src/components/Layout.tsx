import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode
};

const stepOrder = [
  { path: '/', label: 'Start' },
  { path: '/noise-type', label: 'Noise Type' },
  { path: '/noise-details', label: 'Noise Details' },
  { path: '/your-details', label: 'Your Details' },
  { path: '/summary', label: 'Summary'},
  { path: '/confirmation', label: 'Confirmation' },
];

export function Layout({children} : LayoutProps) {

  const { pathname } = useLocation();
  const stepIndex = stepOrder.findIndex((s) => s.path === pathname);
  const currentStep = stepIndex === -1 ? null : stepOrder[stepIndex];

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current?.focus();
  }, [pathname]);

  return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Mini Noise Reporter</h1>
        </header>

        <main className="max-w-2xl mx-auto p-6">
          {currentStep ? <p className="text-sm text-gray-500 mb-4" aria-live="polite">
            Step {stepIndex + 1} of {stepOrder.length} -
            <span className="font-medium text-gray-700"> {currentStep.label}</span>
          </p> : null}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={contentRef} tabIndex={-1}>
            {children}
          </div>
        </main>
      </div>
  )
}