import {NextRequest} from "next/server";
import {ILock} from "@interfaces/lock.interface";
import {addYears} from "date-fns";

interface PutMethodContext {
    params: {
        address: string;
        id: string;
    }
}

const locksMock: ILock[] = [
    {
        owner: '0xabc',
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        amountMNTO: 1500,
        amountsVeMNTO: 100000,
        expireDate: addYears(new Date(), 2),
    },
    {
        owner: '0xabc',
        id: '599ca521-df39-442f-937c-03b20bcafc2a',
        amountMNTO: 500,
        amountsVeMNTO: 6700,
        expireDate: addYears(new Date(), 1),
    },
    {
        owner: '0xabc',
        id: '599ca521-df39-442f-937c-03b20bcafc3d',
        amountMNTO: 200,
        amountsVeMNTO: 1500,
        expireDate: addYears(new Date(), 2),
    },
    {
        owner: '0xabc',
        id: '599ca521-df39-442f-937c-03b20bcafcfd',
        amountMNTO: 1000,
        amountsVeMNTO: 80000,
        expireDate: addYears(new Date(), 3),
    },
]

export async function PUT(req: NextRequest, { params: { address, id } }: PutMethodContext) {
    const lockToExtend = locksMock.find(lock => lock.id === id);
    if (!lockToExtend) {
        return Response.json({
            error: 'Lock not found'
        });
    }
    const body = await req.json();

    return Response.json({
        ...lockToExtend,
        owner: address,
        expireDate: new Date(body.date),
    } as ILock);
}