import {IVote} from "@interfaces/vote.interface";
import {ILock} from "@interfaces/lock.interface";
import {addYears} from "date-fns";

export const locksMock: ILock[] = [
    {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        amountMNTO: 1500,
        amountsVeMNTO: 100000,
        expireDate: addYears(new Date(), 2),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafc2a',
        amountMNTO: 500,
        amountsVeMNTO: 6700,
        expireDate: addYears(new Date(), 1),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafc3d',
        amountMNTO: 200,
        amountsVeMNTO: 1500,
        expireDate: addYears(new Date(), 2),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafcfd',
        amountMNTO: 1000,
        amountsVeMNTO: 80000,
        expireDate: addYears(new Date(), 3),
    },
]