import {NextRequest} from "next/server";
import {locksMock} from "@/app/(api)/api/users/[address]/locks/route";

interface GetMethodContext {
    params: {
        address: string;
    }
}

export async function GET(req: NextRequest, context: GetMethodContext) {
    const address = context.params.address;

    const data = {
        walletAddress: address,
        balanceMENTO: Math.round(Math.random() * 5000),
        balanceVeMENTO: locksMock.reduce((acc, lock) => acc + lock.amountsVeMNTO, 0)
    }

    return Response.json(data);
}