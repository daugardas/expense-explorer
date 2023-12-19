type FormProps = {
    className?: string;
    children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export default function Form({ className, children, ...props }: FormProps) {
    return (
        <form
            className={`flex flex-col items-center gap-2 bg-white rounded-md p-5 w-96 shadow-sm ${
                className ?? ""
            }`}
            {...props}
        >
            {children}
        </form>
    );
}
