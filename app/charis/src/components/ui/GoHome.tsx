import { useNavigate } from "react-router-dom";

function GoHome() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    };

    return (
        <button
            onClick={handleNavigateToHome}
            className="border rounded-md px-4 py-2 text-sm  text-gray-300 font-light hover:bg-gray-800/40 hover:border-gray-600/70 active:bg-gray-800/60 transition-all duration-200">
            Back to Home
        </button>
    );
}

export default GoHome;