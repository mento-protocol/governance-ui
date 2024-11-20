import { Card } from "@/components/_shared";

export const ProposalActionLoading = () => {
  return (
    <Card className="min-h-[260px] p-4">
      <div className="flex flex-col gap-6">
        {/* Header skeleton */}
        <div className="flex justify-center">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Button skeleton */}
        <div className="mt-auto justify-center">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </Card>
  );
};
