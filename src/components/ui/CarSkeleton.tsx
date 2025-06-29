

export default function CarSkeleton() {
  return (
    <div className="card bg-base-100 shadow-sm p-3 rounded-lg relative overflow-hidden">
      {/* Image skeleton */}
      <figure className="overflow-hidden">
        <div className="skeleton w-full h-[250px]"></div>
      </figure>

      {/* Rating badge skeleton */}
      <div className="border-t border-gray-300  relative">
        <div className="skeleton absolute -top-[12px] right-2 w-16 h-6"></div>
      </div>

      <div className="card-body p-3 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-6 w-1/2"></div>
        </div>

        {/* Features skeleton */}
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton w-16 h-6 rounded-full"></div>
          ))}
        </div>

        {/* Price skeleton */}
        <div className="space-y-1">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-5 w-32"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="card-actions justify-end">
          <div className="flex items-center gap-2">
            <div className="skeleton w-8 h-8 rounded-full"></div>
            <div className="skeleton w-24 h-8 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
