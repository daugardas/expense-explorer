import { TransactionType } from "@prisma/client";
import AddTransaction from "./AddTransaction";
import FilterTransactions from "./FilterTransactions";
import { TransactionWithCategory } from "@/lib/types";

export default function TransactionsMenu({
    setFilterOutCategoriesIds,
    setFilterOutTypes,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    note,
    setNote,
    addTransactionToList,
}: {
    setFilterOutCategoriesIds: (ids: string[]) => void;
    setFilterOutTypes: (types: TransactionType[]) => void;
    startDate: Date | null;
    setStartDate: (date: Date) => void;
    endDate: Date | null;
    setEndDate: (date: Date) => void;
    minAmount: number;
    setMinAmount: (amount: number) => void;
    maxAmount: number;
    setMaxAmount: (amount: number) => void;
    note: string;
    setNote: (note: string) => void;
    addTransactionToList: (transaction: TransactionWithCategory) => void;
}) {
    return (
        <div className={`w-full flex flex-row gap-5 flex-wrap`}>
            <div className="flex justify-center items-center">
                <AddTransaction addTransactionToList={addTransactionToList} />
            </div>
            <FilterTransactions
                setFilterOutTypes={setFilterOutTypes}
                setFilterOutCategoriesIds={setFilterOutCategoriesIds}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                minAmount={minAmount}
                setMinAmount={setMinAmount}
                maxAmount={maxAmount}
                setMaxAmount={setMaxAmount}
                note={note}
                setNote={setNote}
            />
        </div>
    );
}
