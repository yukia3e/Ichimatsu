import { SyntheticEvent, useEffect } from "react";
import {
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
  ADAPTER_EVENTS,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import router, { useRouter } from "next/router";
import {
  AuthKit,
  Web3AuthAdapter,
  Web3AuthEventListener,
} from "@/features/auth";
import useAuthStore from "@/stores/useAuthStore";

const connectedHandler: Web3AuthEventListener = (data) => {
  console.log("CONNECTED", data);

  return router.push("/dashboard");
};
const disconnectedHandler: Web3AuthEventListener = (data) => {
  console.log("DISCONNECTED", data);

  return router.push("/");
};

export const useAuth = (): [
  (event: SyntheticEvent) => Promise<void>,
  (event: SyntheticEvent) => Promise<void>
] => {
  const router = useRouter();
  const authKit = useAuthStore((state) => state.authKit);
  const setAuthKit = useAuthStore((state) => state.setAuthKit);
  const setProvider = useAuthStore((state) => state.setProvider);
  const setAuthSignInData = useAuthStore((state) => state.setAuthSignInData);
  const setTorusPlugin = useAuthStore((state) => state.setTorusPlugin);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const options: Web3AuthOptions = {
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "",
        },
        uiConfig: {
          theme: "light",
          loginMethodsOrder: [
            "google",
            "discord",
            "facebook",
            "twitter",
            "line",
            "apple",
            "email_passwordless",
          ],
          // appLogo: "",
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.OPENLOGIN]: {
          label: "Ichimatsu",
          loginMethods: {
            reddit: {
              name: "reddit",
              showOnModal: false,
            },
            github: {
              name: "github",
              showOnModal: false,
            },
            kakao: {
              name: "kakao",
              showOnModal: false,
            },
            linkedin: {
              name: "linkedin",
              showOnModal: false,
            },
            weibo: {
              name: "weibo",
              showOnModal: false,
            },
            wechat: {
              name: "wechat",
              showOnModal: false,
            },
          },
        },
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "metamask",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "none",
        },
        adapterSettings: {
          whiteLabel: {
            name: "Ichimatsu",
            logoLight:
              "https://storage.cloud.google.com/ichimatsu-public/Ichimatsu.png",
            logoDark:
              "https://storage.cloud.google.com/ichimatsu-public/Ichimatsu-bgw.png",
          },
        },
      });

      const torusPlugin = new TorusWalletConnectorPlugin({
        torusWalletOpts: {},
        walletInitOptions: {
          whiteLabel: {
            theme: { isDark: true, colors: { primary: "#9ca3af" } },
            logoLight: `https://storage.cloud.google.com/ichimatsu-public/Ichimatsu.png`,
            logoDark:
              "https://storage.cloud.google.com/ichimatsu-public/Ichimatsu-bgw.png",
          },
          useWalletConnect: true, // make sure this is enabled before using the showWalletConnectScanner function
          enableLogging: true,
        },
      });

      const adapter = new Web3AuthAdapter(
        options,
        [openloginAdapter],
        modalConfig,
        [torusPlugin]
      );

      const authKit = await AuthKit.init(adapter);

      authKit.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      authKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);
      setAuthKit(authKit);
      setTorusPlugin(torusPlugin);

      return () => {
        authKit.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
        authKit.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!authKit) return;

    const response = await authKit.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setAuthSignInData(response);
    setProvider(authKit.getProvider() as SafeEventEmitterProvider);
    // for test only
    // console.log(await authKit.authenticateUser())
    // for test only
    await router.push("/dashboard");
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!authKit) {
      console.error("authKit init error");

      return;
    }
    await authKit.signOut();
    setProvider(null);
    setAuthSignInData(null);
  };

  return [login, logout];
};
