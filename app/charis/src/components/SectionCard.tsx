interface SectionProps {
    title: string;
    children: any;
}

function SectionCard({ title, children }: SectionProps) {
    return (
        <section className="mx-6 mb-6 py-12 px-4 bg-card border rounded-xl">
            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-4xl font-light text-white mb-10 text-left">
                    {title}
                </h2>
                {children}
            </div>
        </section >
    );
}

export default SectionCard;