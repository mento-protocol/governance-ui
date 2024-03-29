import { Card } from "@components/_shared";
import NumbersService from "@/app/helpers/numbers.service";

export const ContractParams = () => {
  return (
    <div className="grid grid-cols-1 gap-x1 md:grid-cols-7 px-x4 pt-x4">
      <Card className="md:col-span-3">
        <Card.Header>
          <div className="color-primary text-x4 font-medium  mb-x6">
            Parameters
          </div>
        </Card.Header>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Proposal threshold</div>
          <div className="text-right">
            {NumbersService.parseNumericValue(1000000)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Quorum needed</div>
          <div className="text-right">
            {NumbersService.parseNumericValue(180070000, 2)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Proposal delay</div>
          <div className="text-right">3 days</div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Voting period</div>
          <div className="text-right">14 days</div>
        </div>
      </Card>
      <Card className="md:col-span-4">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Mento Core
          </div>
        </Card.Header>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Governor</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Token</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Timelock</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
      </Card>
      <Card className="md:col-span-3">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Parameters
          </div>
        </Card.Header>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Proposal threshold</div>
          <div className="text-right">
            {NumbersService.parseNumericValue(1000000)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Quorum needed</div>
          <div className="text-right">
            {NumbersService.parseNumericValue(180070000, 2)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Proposal delay</div>
          <div className="text-right">3 days</div>
        </div>
        <div className="grid grid-cols-2 gap-x1 justify-between mb-3">
          <div className="font-semibold">Voting period</div>
          <div className="text-right">14 days</div>
        </div>
      </Card>
      <Card className="md:col-span-4">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Mento Core
          </div>
        </Card.Header>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Governor</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Token</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
        <div className="flex gap-x2 justify-between mb-3">
          <div className="font-semibold">Timelock</div>
          <div className="text-right col-span-2 break-all">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
        </div>
      </Card>
    </div>
  );
};
