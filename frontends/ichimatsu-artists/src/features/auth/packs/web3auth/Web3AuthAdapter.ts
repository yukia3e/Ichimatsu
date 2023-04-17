import { ExternalProvider } from "@ethersproject/providers";
import { IAdapter } from "@web3auth/base";
import { IPlugin } from "@web3auth/base-plugin";
import { ModalConfig, Web3Auth, Web3AuthOptions } from "@web3auth/modal";

import { getErrorMessage } from "../../lib/errors";
import type { AuthAdapter } from "../../types";
import { Web3AuthEvent, Web3AuthEventListener } from "./types";

/**
 * Web3AuthAdapter implements the AuthClient interface for adapting the Web3Auth service provider
 * @class
 */
export class Web3AuthAdapter implements AuthAdapter<Web3AuthAdapter> {
  provider: ExternalProvider | null;
  web3authInstance?: Web3Auth;
  private options: Web3AuthOptions;
  private adapters?: IAdapter<unknown>[];
  private modalConfig?: Record<string, ModalConfig>;
  private plugins?: IPlugin[];

  /**
   *
   * @param options Web3Auth options {@link https://web3auth.io/docs/sdk/web/modal/initialize#arguments}
   * @param config Web3Auth adapters {@link https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters}
   * @param modalConfig The modal configuration {@link https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization}
   */
  constructor(
    options: Web3AuthOptions,
    adapters?: IAdapter<unknown>[],
    modalConfig?: Record<string, ModalConfig>,
    plugins?: IPlugin[]
  ) {
    this.provider = null;
    this.options = options;
    this.adapters = adapters;
    this.modalConfig = modalConfig;
    this.plugins = plugins;
  }

  /**
   * Initialize the Web3Auth service provider
   * @throws Error if there was an error initializing Web3Auth
   */
  async init(): Promise<void> {
    try {
      this.web3authInstance = new Web3Auth(this.options);

      this.adapters?.forEach((adapter) =>
        this.web3authInstance?.configureAdapter(adapter)
      );

      this.plugins?.forEach((plugin) =>
        this.web3authInstance?.addPlugin(plugin)
      );

      this.provider = this.web3authInstance.provider;

      await this.web3authInstance.initModal({ modalConfig: this.modalConfig });
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /**
   * Connect to the Web3Auth service provider
   * @returns
   */
  async signIn(): Promise<void> {
    if (!this.web3authInstance) return;

    this.provider = await this.web3authInstance.connect();
  }

  /**
   * Disconnect from the Web3Auth service provider
   */
  async signOut(): Promise<void> {
    if (!this.web3authInstance) return;

    this.provider = null;
    await this.web3authInstance.logout();
  }

  /**
   * Allow to subscribe to the Web3Auth events
   * @param event The event you want to subscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  subscribe(event: Web3AuthEvent, handler: Web3AuthEventListener): void {
    this.web3authInstance?.on(event, handler);
  }

  /**
   * Allow to unsubscribe to the Web3Auth events
   * @param event The event you want to unsubscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  unsubscribe(event: Web3AuthEvent, handler: Web3AuthEventListener): void {
    this.web3authInstance?.off(event, handler);
  }

  async authenticateUser(): Promise<string> {
    if (!this.web3authInstance) return "";
    const userAuthInfo = await this.web3authInstance.authenticateUser();

    return userAuthInfo ? userAuthInfo.idToken : "";
  }
}
