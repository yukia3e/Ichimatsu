import { SyntheticEvent, useEffect } from "react";
import {
  SafeAuthKit,
  Web3AuthAdapter,
  Web3AuthEventListener,
} from "@safe-global/auth-kit";
import {
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
  ADAPTER_EVENTS,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import router, { useRouter } from "next/router";
import useSafeAuthStore from "@/stores/useSafeAuthStore";

const connectedHandler: Web3AuthEventListener = (data) => {
  console.log("CONNECTED", data);

  return router.push("/dashboard");
};
const disconnectedHandler: Web3AuthEventListener = (data) => {
  console.log("DISCONNECTED", data);

  return router.push("/");
};

export const useSafeAuth = (): [
  (event: SyntheticEvent) => Promise<void>,
  (event: SyntheticEvent) => Promise<void>
] => {
  const router = useRouter();
  const safeAuthKit = useSafeAuthStore((state) => state.safeAuthKit);
  const setSafeAuthKit = useSafeAuthStore((state) => state.setSafeAuthKit);
  const setProvider = useSafeAuthStore((state) => state.setProvider);
  const setSafeAuthSignInData = useSafeAuthStore(
    (state) => state.setSafeAuthSignInData
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const options: Web3AuthOptions = {
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "",
          // rpcTarget: `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`
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
              "https://storage.cloud.google.com/ichimatsu-public/Ichimatsu-bgw.png",
            logoDark:
              "https://storage.cloud.google.com/ichimatsu-public/Ichimatsu-bgw.png",
          },
        },
      });

      const adapter = new Web3AuthAdapter(
        options,
        [openloginAdapter],
        modalConfig
      );

      const safeAuthKit = await SafeAuthKit.init(adapter);

      safeAuthKit.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      safeAuthKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);
      setSafeAuthKit(safeAuthKit);

      return () => {
        safeAuthKit.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
        safeAuthKit.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!safeAuthKit) return;

    const response = await safeAuthKit.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setSafeAuthSignInData(response);
    setProvider(safeAuthKit.getProvider() as SafeEventEmitterProvider);
    // for test only
    // console.log(await authKit.authenticateUser())
    // for test only
    await router.push("/dashboard");
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!safeAuthKit) {
      console.error("authKit init error");

      return;
    }
    await safeAuthKit.signOut();
    setProvider(null);
    setSafeAuthSignInData(null);
  };

  return [login, logout];
};
