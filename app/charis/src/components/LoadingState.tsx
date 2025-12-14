interface LoadingStateProps {
    message?: string;
}

function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
        <div className="p-6 flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
                <p className="text-gray-400 font-light">{message}</p>
            </div>
        </div>
    );
}

export default LoadingState;