import { Card, Loader, VotingCardTitle } from "@/components/_shared";

export const LoadingState = () => {
  return (
    <Card className="min-h-[260px] p-4">
      <VotingCardTitle />
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <br />
        <Loader className="w-[100%]" isCenter color="dark:fill-mento-mint" />
        <br />
      </div>
    </Card>
  );
};
