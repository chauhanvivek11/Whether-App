const SkeletonCard = () => {
    return (
        <div className="box animate-pulse">
            <div className="space-y-4">
                <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="h-20 w-20 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto"></div>
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
        </div>
    );
};

export default SkeletonCard;