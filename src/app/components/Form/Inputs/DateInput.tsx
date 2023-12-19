import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
    selected: Date;
    onChange: (date: Date) => void;
    placeholder?: string;
};

export default function DateInput({
    selected,
    onChange,
    placeholder,
}: DateInputProps) {
    return (
        <DatePicker
            placeholderText={placeholder}
            selected={selected}
            onChange={(date: Date) => onChange(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border border-black/30 rounded-md outline-none p-2"
        />
    );
}
