import Link from "next/link";
import TransactionRangeType from "./TransactionRangeTypes";

export default function TransactionRangeTypeSelector({
    selected,
}: {
    selected: string;
}) {
    const selectedIndex = TransactionRangeType.indexOf(selected);

    return (
        <div className="justify-items-center items-center grid grid-flow-col auto-cols-fr">
            {TransactionRangeType.map((type, i) => (
                <Link
                    href={`/transactions/${type}`}
                    key={type}
                    className={`bg-white w-full h-full text-center py-2 border-4 border-bone first:!rounded-l-full first:!border-l-4 last:!rounded-r-full last:!border-r-4 last:pl-[4px] border-r-0 ${
                        type === selected
                            ? "!border-khaki border-r-4 border-l-4 last:!pl-0"
                            : "pr-[4px] last:!pr-0"
                    } ${selectedIndex + 1 == i ? "border-l-0 pl-[4px]" : ""}`}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Link>
            ))}
        </div>
    );
}
