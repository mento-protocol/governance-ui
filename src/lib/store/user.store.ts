import { create } from "zustand";
import { ILock } from "@interfaces/lock.interface";

interface UserStore {
  walletAddress?: string;
  locks: ILock[];
  isFetching: boolean;
  isReady: boolean;
  isLocksFetching: boolean;
  isInitialized: boolean;
  getBalance: () => Promise<void>;
  getLocks: () => Promise<void>;
  initWallet: (walletAddress: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  balanceMENTO: number;
  balanceVeMENTO: number;
  lock: (lock: ILock) => Promise<void>;
  extendLock: (id: string, date: Date) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  walletAddress: undefined,
  locks: [],
  isFetching: false,
  isReady: false,
  isLocksFetching: false,
  isInitialized: false,
  balanceMENTO: 0,
  balanceVeMENTO: 0,
  disconnectWallet: async () => {
    set({
      walletAddress: undefined,
      isInitialized: false,
      isFetching: false,
      isLocksFetching: false,
      isReady: false,
      locks: [],
      balanceMENTO: 0,
      balanceVeMENTO: 0,
    });
  },
  initWallet: async (walletAddress) => {
    set({ isInitialized: true });
    set({ isFetching: true });
    set({ walletAddress });

    await get().getBalance();

    if (get().isLocksFetching) {
      await get().getLocks();
    }
    set({ isReady: true });
  },
  getBalance: async () => {
    set({ isFetching: true });

    const walletAddress = get().walletAddress;
    if (!walletAddress) {
      return;
    }

    const balanceResponse = await fetch(`/api/users/${walletAddress}/balance`);

    const balanceResponseJson = await balanceResponse.json();

    set({
      balanceMENTO: balanceResponseJson.balanceMENTO,
      balanceVeMENTO: balanceResponseJson.balanceVeMENTO,
      isFetching: false,
    });
  },
  getLocks: async () => {
    set({ isLocksFetching: true });

    const walletAddress = get().walletAddress;
    if (!walletAddress) {
      return;
    }

    const locksResponse = await fetch(`/api/users/${walletAddress}/locks`);

    const locksResponseJson = await locksResponse.json();

    set({
      locks: locksResponseJson.map((lock: ILock) => ({
        ...lock,
        expireDate: new Date(lock.expireDate),
      })),
      isLocksFetching: false,
    });
  },
  lock: async (lock) => {
    set({ isLocksFetching: true });

    const walletAddress = get().walletAddress;
    if (!walletAddress) {
      return;
    }

    const lockResponse = await fetch(`/api/users/${walletAddress}/locks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lock),
    });

    const lockResponseJson = await lockResponse.json();

    set({
      locks: [
        {
          ...lockResponseJson,
          expireDate: new Date(lockResponseJson.expireDate),
        },
        ...get().locks,
      ],
      isLocksFetching: false,
    });

    await get().getBalance();
  },
  extendLock: async (id, date) => {
    set({ isFetching: true });

    const walletAddress = get().walletAddress;
    if (!walletAddress) {
      return;
    }

    const lockResponse = await fetch(
      `/api/users/${walletAddress}/locks/${id}/extend`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      },
    );

    const lockResponseJson = await lockResponse.json();

    set({
      balanceMENTO: lockResponseJson.balanceMENTO,
      balanceVeMENTO: lockResponseJson.balanceVeMENTO,
      isFetching: false,
    });
  },
}));
