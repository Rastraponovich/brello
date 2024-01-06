interface LoaderCircleProps {
  className?: string;
  pending?: boolean;
}
export const LoaderCircle = ({ pending }: LoaderCircleProps) => {
  if (!pending) {
    return null;
  }

  return (
    <div className="bg-white/90 absolute inset-0 z-10 flex items-center justify-center flex-col gap-4">
      <Circle />
      <span className="text-sm text-gray-700 font-medium">loading...</span>
    </div>
  );
};

const Circle = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" strokeWidth="12" fill="none" className="stroke-blue-600">
        <animate
          dur="2s"
          begin="0s"
          to="251.2, 0"
          from="0, 251.2"
          attributeType="XML"
          repeatCount="indefinite"
          attributeName="stroke-dasharray"
        />
        <animate
          dur="2s"
          from="0"
          begin="0s"
          to="-251.2"
          attributeType="XML"
          repeatCount="indefinite"
          attributeName="stroke-dashoffset"
        />
      </circle>
    </svg>
  );
};
