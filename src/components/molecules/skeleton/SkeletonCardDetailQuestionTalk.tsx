import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardDetailQuestionTalkSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
