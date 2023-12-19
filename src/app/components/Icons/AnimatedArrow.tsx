export default function AnimatedArrow({
    rotationClass,
}: {
    rotationClass: string;
}) {
    return (
        <svg
            className={`w-4 h-4 ml-2 transition-transform transform ${rotationClass}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}
