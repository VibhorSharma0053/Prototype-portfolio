const Skeleton = ({ width, height, rounded = 'rounded-lg', className = '' }) => {
  return (
    <div
      className={`skeleton ${rounded} ${className}`}
      style={{
        width: width || '100%',
        height: height || '20px',
      }}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${className}`}>
      <Skeleton height="200px" rounded="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton height="14px" width="60%" />
        <Skeleton height="22px" width="85%" />
        <Skeleton height="14px" width="100%" />
        <Skeleton height="14px" width="75%" />
        <div className="flex gap-2 pt-2">
          <Skeleton height="28px" width="70px" rounded="rounded-full" />
          <Skeleton height="28px" width="70px" rounded="rounded-full" />
          <Skeleton height="28px" width="70px" rounded="rounded-full" />
        </div>
        <div className="flex gap-3 pt-3">
          <Skeleton height="40px" width="50%" rounded="rounded-xl" />
          <Skeleton height="40px" width="50%" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="16px"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar = ({ size = '48px', className = '' }) => {
  return <Skeleton width={size} height={size} rounded="rounded-full" className={className} />;
};

export const SkeletonTable = ({ rows = 5, cols = 5, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-4 p-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height="16px" width={`${100 / cols}%`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-t border-white/5">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="14px" width={`${100 / cols}%`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
