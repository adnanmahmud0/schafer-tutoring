// components/free-trial/FormNavigationButtons.tsx
interface FormNavigationButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  isLastStep?: boolean;
}

export const FormNavigationButtons = ({
  step,
  totalSteps,
  onNext,
  isLastStep = false,
}: FormNavigationButtonsProps) => {
  return (
    <button
      onClick={onNext}
      className="w-2/3 mx-auto bg-[#0B31BD] text-white py-3 rounded-md font-medium hover:bg-[#062183] transition-colors flex items-center justify-center gap-2"
    >
      {isLastStep ? "Send the Request" : "Next Step"}
    </button>
  );
};
