import { ExternalProvider } from "@ethersproject/providers";

import { Web3AuthAdapter } from "./packs/web3auth/Web3AuthAdapter";
import { Web3AuthEvent, Web3AuthEventListener } from "./packs/web3auth/types";

export interface AuthSignInData {
  eoa: string;
  idToken?: string;
}

export interface AuthAdapter<TAdapter> {
  provider: ExternalProvider | null;
  init(): Promise<void>;
  signIn(): Promise<SignInResponse<TAdapter>>;
  signOut(): Promise<void>;
  subscribe(
    event: AuthEvent<TAdapter>,
    handler: AuthEventListener<TAdapter>
  ): void;
  unsubscribe(
    event: AuthEvent<TAdapter>,
    handler: AuthEventListener<TAdapter>
  ): void;
  authenticateUser(): Promise<string>;
}

export interface IAuthKit<TAdapter> {
  signIn(): Promise<AuthSignInData>;
  signOut(): Promise<void>;
  getProvider(): ExternalProvider | null;
  subscribe(
    event: AuthEvent<TAdapter>,
    listener: AuthEventListener<TAdapter>
  ): void;
  unsubscribe(
    event: AuthEvent<TAdapter>,
    listener: AuthEventListener<TAdapter>
  ): void;
}

export type AuthEvent<T> = T extends Web3AuthAdapter ? Web3AuthEvent : never;
export type AuthEventListener<T> = T extends Web3AuthAdapter
  ? Web3AuthEventListener
  : never;
export type SignInResponse<T> = T extends Web3AuthAdapter ? void : never;
