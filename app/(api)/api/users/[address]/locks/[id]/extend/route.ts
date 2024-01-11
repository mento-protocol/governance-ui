import {NextRequest} from "next/server";
import {ILock} from "@interfaces/lock.interface";
import {addYears} from "date-fns";
import {locksMock} from "@/app/(api)/api/users/[address]/locks/route";

interface PutMethodContext {
    params: {
        address: string;
        id: string;
    }
}

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