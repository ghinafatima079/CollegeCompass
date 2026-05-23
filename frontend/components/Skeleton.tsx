interface SkeletonProps {
    className?: string;
}

export default function Skeleton({
    className = ""
}: SkeletonProps) {

    return (

        <div
            className={`
                animate-pulse
                rounded-xl
                bg-[#161b22]
                ${className}
            `}
        />

    );
}