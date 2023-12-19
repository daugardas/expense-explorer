// Select and its child styles are not applied to some browsers.

type OptionProps = {
    className?: string;
    children: React.ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>;

export default function Option({ className, children, ...props }: OptionProps) {
    return (
        <option className={`${className ?? ""}`} {...props}>
            {children}
        </option>
    );
}
