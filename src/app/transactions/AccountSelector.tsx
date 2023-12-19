import Select from "@/app/components/Form/Select/Select";
import { Account } from "@prisma/client";

type AccountSelectorProps = {
    name: string;
    accounts: Account[];
    selectedAccountId: string | null;
    setSelectedAccountId: (id: string) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function AccountSelector({
    name,
    accounts,
    selectedAccountId,
    setSelectedAccountId,
    ...props
}: AccountSelectorProps) {
    return (
        <Select
            name={name}
            value={selectedAccountId ?? undefined}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            {...props}
        >
            {accounts.map((account) => {
                return (
                    <option key={account.id} value={account.id}>
                        {account.name}
                    </option>
                );
            })}
        </Select>
    );
}
