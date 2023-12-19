import AccountList from "../AccountList";
import CreateAccountForm from "./CreateAccountForm";

export default function Page() {
    return (
        <>
            <AccountList />
            <div>
                <h1 className="w-full text-center text-2xl font-bold mb-5">
                    Create Account
                </h1>
                <CreateAccountForm />
            </div>
        </>
    );
}
