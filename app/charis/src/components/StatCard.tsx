import type { JSX } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: JSX.Element;
    iconBgColor?: string;
    className?: string;
}

function StatCard({
    title,
    value,
    icon,
    className,
}: StatCardProps) {
    return (
        <div className={`bg-card flex flex-col border rounded-2xl p-6 items-start shadow-md flex-1 ${className || ""}`}>
            <div className="p-3 rounded-full border">
                {icon}
            </div>
            <div className="flex flex-col items-start mt-12">
                <p className="text-sm text-gray-400 mb-4">{title}</p>
                <p className="text-2xl font-light text-gray">{value}</p>
            </div>
        </div>
    );
}

export default StatCard;