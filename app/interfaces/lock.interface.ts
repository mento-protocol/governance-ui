export interface ILock {
    owner: string;
    id: string;
    amountMNTO: number;
    amountsVeMNTO: number;
    expireDate: Date;
}
