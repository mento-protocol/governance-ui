import { useCallback } from "react";

export const enum LocalStorageKeys {
  DARK_MODE_TOGGLE = "mento-governance-ui/dark-mode-toggle",
}

// Used to avoid collisions, can potentially add environments/versions to this
export const useLocalStorage = (storageKey: LocalStorageKeys) => {
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
    storageKey,
    setItem,
    getItem,
    removeItem,
  };
};
