// components/free-trial/FormNavigationButtons.tsx
interface FormNavigationButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep?: boolean;
}

export const FormNavigationButtons = ({
  step,
  totalSteps,
  onNext,
  onBack,
  isLastStep = false,
}: FormNavigationButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onBack}
        disabled={step === 1}
        className="w-full max-w-md mx-auto bg-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="w-full max-w-md mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
      >
        {isLastStep ? "Send the Request" : "Next Step"}
      </button>
    </div>
  );
};
