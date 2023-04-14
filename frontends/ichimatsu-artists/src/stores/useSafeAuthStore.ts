import {
  SafeAuthKit,
  SafeAuthSignInData,
  Web3AuthAdapter,
} from "@safe-global/auth-kit";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { create } from "zustand";

interface SafeAuthState {
  safeAuthKit: SafeAuthKit<Web3AuthAdapter> | null;
  provider: SafeEventEmitterProvider | null;
  safeAuthSignInData: SafeAuthSignInData | null;
  setSafeAuthKit: (safeAuthKit: SafeAuthKit<Web3AuthAdapter> | null) => void;
  setProvider: (provider: SafeEventEmitterProvider | null) => void;
  setSafeAuthSignInData: (
    safeAuthSignInData: SafeAuthSignInData | null
  ) => void;
}

const useSafeAuthStore = create<SafeAuthState>()((set, _) => ({
  safeAuthKit: null,
  provider: null,
  safeAuthSignInData: null,
  setSafeAuthKit: (safeAuthKit) => {
    set({ safeAuthKit });
  },
  setProvider: (provider) => {
    set({ provider });
  },
  setSafeAuthSignInData: (safeAuthSignInData) => {
    set({ safeAuthSignInData });
  },
}));

export default useSafeAuthStore;
