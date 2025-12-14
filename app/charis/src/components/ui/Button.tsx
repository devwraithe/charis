interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

function Button({ title, onClick, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`border rounded-md px-4 py-2 text-sm text-gray-300 font-light 
            hover:bg-gray-800/40 hover:border-gray-600/70 active:bg-gray-800/60 
            transition-all duration-200 ${className || ""}`}>
            {title}
        </button>
    );
}

export default Button;
