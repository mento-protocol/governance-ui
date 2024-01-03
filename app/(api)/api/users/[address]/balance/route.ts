import {NextRequest} from "next/server";

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
        balanceVeMENTO: Math.round(Math.random() * 500000),
    }

    return Response.json(data);
}