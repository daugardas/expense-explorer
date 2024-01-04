"use client";

import { Account, Category, TransactionType } from "@prisma/client";
import {
    CategoryWithSubcategories,
    TransactionWithCategory,
    TransactionWithCategoryByDate,
} from "@/lib/types";
import { useState } from "react";
import TransactionsMenu from "./TransactionsMenu";
import ClientModal from "../components/ClientModal";
import TransactionTypeSelector from "./TransactionTypeSelector";
import EditTransaction from "./EditTransaction";

function TransactionComponent({
    transaction,
    accounts,
}: {
    transaction: TransactionWithCategory;
    accounts: Account[];
}) {
    const fromAccount = accounts.find(
        (account) => account.id === transaction.fromAccountId
    );
    if (transaction.type === TransactionType.INCOME) {
        return (
            <>
                <div>
                    {transaction.type.charAt(0) +
                        transaction.type.slice(1).toLowerCase()}
                </div>
                <div className="">{transaction.category?.name}</div>
                <div className="">{fromAccount?.name}</div>
                <div className="text-green-500">{transaction.amount}</div>
                <div>{transaction.note || "--"}</div>
            </>
        );
    }

    if (transaction.type === TransactionType.EXPENSE) {
        return (
            <>
                <div>
                    {transaction.type.charAt(0) +
                        transaction.type.slice(1).toLowerCase()}
                </div>
                <div className="">{fromAccount?.name}</div>
                <div className="">{transaction.category?.name}</div>
                <div className="text-red-500">{transaction.amount}</div>
                <div>{transaction.note || "--"}</div>
            </>
        );
    }

    const toAccount = accounts.find(
        (account) => account.id === transaction.toAccountId
    );

    return (
        <>
            <div>
                {transaction.type.charAt(0) +
                    transaction.type.slice(1).toLowerCase()}
            </div>
            <div className="">{fromAccount?.name}</div>
            <div className="">{toAccount?.name}</div>
            <div className="text-yellow-500">{transaction.amount}</div>
            <div>{transaction.note || "--"}</div>
        </>
    );
}

function TransactionByDateWrap({
    date,
    transactionsByDate,
    accounts,
    setEditTransactionId,
    currentEditTransactionId,
}: {
    date: string;
    transactionsByDate: TransactionWithCategoryByDate;
    accounts: Account[];
    setEditTransactionId: (id: string) => void;
    currentEditTransactionId: string;
}) {
    return (
        <div className="rounded-lg p-3 bg-white w-full">
            <h1 className="font-bold px-1">{date}</h1>
            {transactionsByDate[date].map((transaction) => (
                <div
                    key={transaction.id}
                    className={`grid grid-cols-[0.4fr_0.4fr_0.4fr_0.5fr_1fr] hover:bg-isabelline px-1 rounded-md hover:cursor-pointer ${
                        currentEditTransactionId === transaction.id
                            ? "!bg-bone"
                            : ""
                    }`}
                    onClick={() => setEditTransactionId(transaction.id)}
                >
                    <TransactionComponent
                        transaction={transaction}
                        accounts={accounts}
                    />
                </div>
            ))}
        </div>
    );
}

type TransactionsListProps = {
    transactionsByDate: TransactionWithCategoryByDate;
    accounts: Account[];
    categories: CategoryWithSubcategories[];
};

// enum SortBy {
//     TYPE = "type",
//     FROM = "from",
//     TO = "to",
//     AMOUNT = "amount",
//     NOTE = "note",
//     DATE = "date", // sort by date by default, newest first
// }

export default function TransactionsList({
    transactionsByDate,
    accounts,
    categories,
}: TransactionsListProps) {
    // const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE);
    // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const [transactions, setTransactions] =
        useState<TransactionWithCategoryByDate>(transactionsByDate);

    const handleDeleteTransaction = (id: string) => {
        let newTransactions = transactions;
        Object.entries(newTransactions).forEach(([date, transactions]) => {
            newTransactions[date] = transactions.filter(
                (transaction) => transaction.id !== id
            );
        });

        // remove empty dates
        newTransactions = Object.fromEntries(
            Object.entries(newTransactions).filter(
                ([_, transactions]) => transactions.length > 0
            )
        );

        setTransactions(newTransactions);
    };

    const handleAddTransactionToList = (
        transaction: TransactionWithCategory
    ) => {
        const date = new Date(transaction.date).toISOString().split("T")[0];
        let newTransactions = {
            ...transactions,
            [date]: Object.entries(transactions).find(([d, _]) => date === d)
                ? [...transactions[date], transaction]
                : [transaction],
        };

        // sort transactions by date in date property
        Object.entries(newTransactions).forEach(([date, transactions]) => {
            transactions.sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);
                return bDate.getTime() - aDate.getTime();
            });
        });

        // sort newTransactions object by [date] property from newest to oldest
        newTransactions = Object.fromEntries(
            Object.entries(newTransactions).sort(([a], [b]) => {
                const aDate = new Date(a);
                const bDate = new Date(b);
                return bDate.getTime() - aDate.getTime();
            })
        );

        setTransactions(newTransactions);
    };

    const handleEditTransaction = (transaction: TransactionWithCategory) => {
        // remove previous instance of such transaction id, because the date might have changed

        let newTransactions = transactions;
        Object.entries(newTransactions).forEach(([date, transactions]) => {
            newTransactions[date] = transactions.filter(
                (t) => t.id !== transaction.id
            );
        });

        const date = new Date(transaction.date).toISOString().split("T")[0];
        newTransactions = {
            ...newTransactions,
            [date]: Object.entries(newTransactions).find(([d, _]) => date === d)
                ? [...newTransactions[date], transaction]
                : [transaction],
        };

        // sort transactions by date
        Object.entries(newTransactions).forEach(([date, transactions]) => {
            transactions.sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);
                return bDate.getTime() - aDate.getTime();
            });
        });

        setTransactions(newTransactions);
    };

    const [filterOutCategoriesIds, setFilterOutCategoriesIds] = useState<
        string[]
    >([]);
    const [filterOutTypes, setFilterOutTypes] = useState<TransactionType[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [minAmount, setMinAmount] = useState<number>(0);
    const [maxAmount, setMaxAmount] = useState<number>(Infinity);
    const [note, setNote] = useState<string>("");

    const [editTransactionId, setEditTransactionId] = useState<string>("");

    let filteredTransactionsByDate =
        filterOutCategoriesIds.length > 0
            ? Object.fromEntries(
                  Object.entries(transactions).map(([date, transactions]) => [
                      date,
                      transactions.filter((transaction) =>
                          filterOutCategoriesIds.includes(
                              transaction.categoryId || ""
                          )
                      ),
                  ])
              )
            : transactions;

    filteredTransactionsByDate =
        filterOutTypes.length > 0
            ? Object.fromEntries(
                  Object.entries(filteredTransactionsByDate).map(
                      ([date, transactions]) => [
                          date,
                          transactions.filter((transaction) =>
                              filterOutTypes.includes(transaction.type)
                          ),
                      ]
                  )
              )
            : filteredTransactionsByDate;

    // remove dates outside of date range
    filteredTransactionsByDate = Object.fromEntries(
        Object.entries(filteredTransactionsByDate).filter(([date, _]) => {
            const dateObj = new Date(date);
            const start = startDate
                ? new Date(
                      startDate.getFullYear(),
                      startDate.getMonth(),
                      startDate.getDate()
                  )
                : null;
            const end = endDate
                ? new Date(
                      endDate.getFullYear(),
                      endDate.getMonth(),
                      endDate.getDate()
                  )
                : null;
            const current = new Date(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDate()
            );

            return (!start || current >= start) && (!end || current <= end);
        })
    );

    // remove transactions outside of amount range
    filteredTransactionsByDate = Object.fromEntries(
        Object.entries(filteredTransactionsByDate).map(
            ([date, transactions]) => [
                date,
                transactions.filter(
                    (transaction) =>
                        transaction.amount >= minAmount &&
                        transaction.amount <= maxAmount
                ),
            ]
        )
    );

    // remove transactions without note
    filteredTransactionsByDate = Object.fromEntries(
        Object.entries(filteredTransactionsByDate).map(
            ([date, transactions]) => [
                date,
                transactions.filter(
                    (transaction) =>
                        transaction.note?.toLowerCase().includes(note) ||
                        note === ""
                ),
            ]
        )
    );

    // remove empty dates
    filteredTransactionsByDate = Object.fromEntries(
        Object.entries(filteredTransactionsByDate).filter(
            ([_, transactions]) => transactions.length > 0
        )
    );

    let editTransaction: TransactionWithCategory | null = null;
    Object.entries(filteredTransactionsByDate).forEach(([_, transactions]) => {
        const transaction = transactions.find(
            (transaction) => transaction.id === editTransactionId
        );
        if (transaction) {
            editTransaction = transaction;
        }
    });

    return (
        <>
            {editTransactionId.length > 0 && editTransaction && (
                <EditTransaction
                    transaction={editTransaction}
                    accounts={accounts}
                    categories={categories}
                    setEditTransactionId={setEditTransactionId}
                    handleEditTransaction={handleEditTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            )}
            <div className="p-5">
                <TransactionsMenu
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
                    addTransactionToList={handleAddTransactionToList}
                />
                <div className="grid grid-flow-row gap-2 mt-4">
                    {Object.keys(filteredTransactionsByDate).length > 0 ? (
                        <>
                            <div className="grid grid-cols-[0.4fr_0.4fr_0.4fr_0.5fr_1fr] px-4">
                                <div className="font-bold">Type</div>
                                <div className="font-bold">From</div>
                                <div className="font-bold">To</div>
                                <div className="font-bold">Amount</div>
                                <div className="font-bold">Note</div>
                            </div>
                            {Object.keys(filteredTransactionsByDate).map(
                                (date) => (
                                    <TransactionByDateWrap
                                        key={date}
                                        date={date}
                                        transactionsByDate={
                                            filteredTransactionsByDate
                                        }
                                        accounts={accounts}
                                        setEditTransactionId={
                                            setEditTransactionId
                                        }
                                        currentEditTransactionId={
                                            editTransactionId
                                        }
                                    />
                                )
                            )}
                        </>
                    ) : (
                        <div className="text-center text-gray-500">
                            No transactions found
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
