import { TransactionType } from "@prisma/client";

type TypeSelectProps = {
    selectedType: TransactionType;
    type: TransactionType;
    setType: (type: TransactionType) => void;
};

function TypeSelect({ selectedType, type, setType }: TypeSelectProps) {
    return (
        <button
            type="button"
            className={`px-5 py-2 w-full h-full text-center ${
                selectedType === type ? "bg-selected" : "bg-notSelected"
            }`}
            onClick={() => setType(type)}
        >
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </button>
    );
}

type TransactionTypeSelectorProps = {
    selectedType: TransactionType;
    setType: (type: TransactionType) => void;
};

export default function TransactionTypeSelector({
    selectedType,
    setType,
}: TransactionTypeSelectorProps) {
    return (
        <div className="grid  grid-cols-3 gap-2">
            <TypeSelect
                selectedType={selectedType}
                setType={setType}
                type={TransactionType.INCOME}
            />
            <TypeSelect
                selectedType={selectedType}
                setType={setType}
                type={TransactionType.EXPENSE}
            />
            <TypeSelect
                selectedType={selectedType}
                setType={setType}
                type={TransactionType.TRANSFER}
            />
        </div>
    );
}
