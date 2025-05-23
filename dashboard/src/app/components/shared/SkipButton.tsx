type SkipButtonProps = {
    onClick: () => void;
  };
  
  export default function SkipButton({ onClick }: SkipButtonProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-sm text-gray-500 hover:text-black underline mt-2"
      >
        Skip
      </button>
    );
  }
  