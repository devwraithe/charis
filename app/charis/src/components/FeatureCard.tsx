interface FeatureCardProps {
    title: string;
    description: string | number;
    icon: any;
    iconBgColor?: string;
}

function FeatureCard({
    title,
    description,
    icon,
}: FeatureCardProps) {
    return (
        <div className="bg-card flex flex-col border rounded-2xl p-6 items-start flex-1">
            <div className="p-3 rounded-full border">
                {icon}
            </div>
            <div className="mt-12 text-left">
                <p className="text-lg text-gray font-light mb-4">{title}</p>
                <p className="text-sm font-light text-gray-400">{description}</p>
            </div>
        </div>
    );
}

export default FeatureCard;