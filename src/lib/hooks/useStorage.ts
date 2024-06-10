import { useCallback, useMemo } from "react";

export const enum LocalStorageKeys {
  DarkModeToggle = "mento-governance-ui/dark-mode-toggle",
  CreateProposal = "mento-governance-ui/create-proposal",
}

// Used to avoid collisions, can potentially add environments/versions to this
export const useLocalStorage = (storageKey: LocalStorageKeys) => {
  const canUseLocalStorage = useMemo(() => {
    try {
      const key = `__storage__test`;
      window.localStorage.setItem(key, "");
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const setItem = useCallback(
    (itemKey: string, value: string) => {
      return localStorage.setItem(`${storageKey}/${itemKey}`, value);
    },
    [storageKey],
  );

  const getItem = useCallback(
    (itemKey: string) => {
      return localStorage.getItem(`${storageKey}/${itemKey}`);
    },
    [storageKey],
  );

  const removeItem = useCallback(
    (itemKey: string) => {
      return localStorage.removeItem(`${storageKey}/${itemKey}`);
    },
    [storageKey],
  );

  return {
    canUseLocalStorage,
    storageKey,
    setItem,
    getItem,
    removeItem,
  };
};
