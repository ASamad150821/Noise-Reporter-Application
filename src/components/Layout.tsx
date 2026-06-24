import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * Layout is a shared wrapper around every page. It renders:
 *   - a page header
 *   - a step indicator ("Step 2 of 4")
 *   - the current page as children
 *
 * `children` is a special prop — it's whatever JSX was put between
 * <Layout> and </Layout>. In App.tsx that's the <Routes> block.
 *
 * useLocation is a React Router hook that gives you the current URL.
 * We use it here to figure out which step we're on.
 */

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

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const stepIndex = stepOrder.findIndex((s) => s.path === pathname);
  const currentStep = stepIndex === -1 ? null : stepOrder[stepIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Mini Noise Reporter
        </h1>
      </header>

      <main className="max-w-2xl mx-auto p-6">
        {currentStep && (
          <p className="text-sm text-gray-500 mb-4">
            Step {stepIndex + 1} of {stepOrder.length} —{' '}
            <span className="font-medium text-gray-700">
              {currentStep.label}
            </span>
          </p>
        )}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
