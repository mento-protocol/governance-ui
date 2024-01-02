import {create} from "zustand";

interface UserStore {
    walletAddress: string;
    mntoBalance: number;
    veMntoBalance: number;
}

const userStore = create<UserStore>((set) => ({
    walletAddress: '',
    mntoBalance: 0,
    veMntoBalance: 0,
}))

export default userStore;


