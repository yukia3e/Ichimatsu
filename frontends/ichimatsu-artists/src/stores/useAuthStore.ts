import { SafeEventEmitterProvider } from "@web3auth/base";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { AuthKit, Web3AuthAdapter } from '@/features/auth'
import { AuthSignInData } from '@/features/auth'
import { create } from "zustand";

interface AuthState {
  authKit: AuthKit<Web3AuthAdapter> | null;
  provider: SafeEventEmitterProvider | null;
  authSignInData: AuthSignInData | null;
  torusPlugin: TorusWalletConnectorPlugin | null;
  setAuthKit: (authKit: AuthKit<Web3AuthAdapter> | null) => void;
  setProvider: (provider: SafeEventEmitterProvider | null) => void;
  setAuthSignInData: (authSignInData: AuthSignInData | null) => void;
  setTorusPlugin: (torusPlugin: TorusWalletConnectorPlugin | null) => void;
}

const useAuthStore = create<AuthState>()((set, _) => ({
  authKit: null,
  provider: null,
  authSignInData: null,
  torusPlugin: null,
  setAuthKit: (authKit) => {
    set({ authKit });
  },
  setProvider: (provider) => {
    set({ provider });
  },
  setAuthSignInData: (authSignInData) => {
    set({ authSignInData });
  },
  setTorusPlugin: (torusPlugin) => {
    set({ torusPlugin });
  }
}));

export default useAuthStore;
