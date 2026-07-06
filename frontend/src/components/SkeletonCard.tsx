export default function SkeletonCard() {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative h-[180px] animate-pulse bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </article>
  );
}
