import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

function NoWalletConnected() {
    const navigate = useNavigate();

    const handleHomeNav = () => {
        navigate('/');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h3 className="mb-3 text-2xl font-light">
                Wallet not connected
            </h3>

            <p className="mb-6 max-w-sm text-sm font-light text-gray-400">
                Connect your wallet to access your dashboard and manage your creator
                activity.
            </p>

            <Button title="Go back home" onClick={handleHomeNav} />
        </div>
    );
}

export default NoWalletConnected;
