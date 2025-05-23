type SkipButtonProps = {
    onClick: () => void;
  };
  
  export default function SkipButton({ onClick }: SkipButtonProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-sm text-white/60 hover:text-white/80 cursor-pointer underline mt-2"
      >
        Skip
      </button>
    );
  }
  