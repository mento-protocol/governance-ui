import { Card, Loader, VotingCardTitle } from "@/components/_shared";

export const LoadingState = () => {
  return (
    <Card>
      <VotingCardTitle />
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <br />
        <Loader isCenter />
        <br />
      </div>
    </Card>
  );
};
