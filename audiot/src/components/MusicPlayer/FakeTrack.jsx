/* eslint-disable react/prop-types */
import { Skeleton } from "@/components/ui/skeleton"

const FakeTrack = () => {

  return (
    <div className="flex-1 flex items-center justify-start sm:space-x-6">
      <Skeleton className="hidden sm:block h-[70px] w-[70px] rounded-full" />
    <div className="space-y-2 w-[50%]">
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  </div>
  );
}

export default FakeTrack;
