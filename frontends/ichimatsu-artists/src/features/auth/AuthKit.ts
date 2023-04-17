import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import {
  AuthSignInData,
  AuthAdapter,
  AuthEvent,
  AuthEventListener,
  IAuthKit,
} from "./types";

/**
 * AuthKit provides a simple interface for web2 logins
 */
export class AuthKit<TAdapter extends AuthAdapter<TAdapter>>
  implements IAuthKit<TAdapter>
{
  private adapter: TAdapter;
  AuthData?: AuthSignInData;

  /**
   * Initialize the AuthKit
   * @constructor
   * @param client The client implementing the AuthClient interface
   * @param config The configuration options
   */
  constructor(adapter: TAdapter) {
    this.adapter = adapter;
  }

  /**
   * The static method allows to initialize the AuthKit asynchronously
   * @param providerType Choose the provider service to use
   * @param config The configuration including the one for the specific provider
   * @returns A AuthKit instance
   * @throws Error if the provider type is not supported
   */
  static async init<T extends AuthAdapter<T>>(adapter: T): Promise<AuthKit<T>> {
    if (!adapter) {
      throw new Error("The adapter is not defined");
    }

    await adapter.init();

    return new this(adapter);
  }

  /**
   * Authenticate the user
   * @returns the derived external owned account and the safes associated with the user if the txServiceUrl is provided
   * @throws Error if the provider was not created
   * @throws Error if there was an error while trying to get the safes for the current user using the provided txServiceUrl
   */
  async signIn(): Promise<AuthSignInData> {
    await this.adapter.signIn();

    if (!this.adapter.provider) {
      throw new Error("Provider is not defined");
    }

    const ethersProvider = new ethers.providers.Web3Provider(
      this.adapter.provider
    );

    const signer = ethersProvider.getSigner();

    const address = await signer.getAddress();

    this.AuthData = {
      eoa: address,
    };

    return this.AuthData;
  }

  /**
   * Sign out the user
   */
  async signOut(): Promise<void> {
    await this.adapter.signOut();

    this.AuthData = undefined;
  }

  /**
   *
   * @returns The Ethereum provider
   */
  getProvider(): ExternalProvider | null {
    if (!this.adapter) return null;

    return this.adapter?.provider;
  }

  /**
   * Subscribe to an event
   * @param eventName The event name to subscribe to. Choose from AuthEvents type
   * @param listener The callback function to be called when the event is emitted
   */
  subscribe(
    event: AuthEvent<TAdapter>,
    listener: AuthEventListener<TAdapter>
  ): void {
    this.adapter.subscribe(event, listener);
  }

  /**
   * Unsubscribe from an event
   * @param eventName The event name to unsubscribe from. Choose from AuthEvents type
   * @param listener The callback function to unsubscribe
   */
  unsubscribe(
    event: AuthEvent<TAdapter>,
    listener: AuthEventListener<TAdapter>
  ): void {
    this.adapter.unsubscribe(event, listener);
  }

  async authenticateUser(): Promise<string> {
    if (!this.adapter) return "";

    return this.adapter.authenticateUser();
  }
}
