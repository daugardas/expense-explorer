type LabelProps = {
    className?: string;
    children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, children, ...props }: LabelProps) {
    return (
        <label className={` ${className ?? ""}`} {...props}>
            {children}
        </label>
    );
}
