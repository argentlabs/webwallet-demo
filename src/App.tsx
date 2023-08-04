import { FC, useEffect, useState } from "react";
import {
  StarknetConfig,
  useAccount,
  InjectedConnector,
  Connector,
} from "@starknet-react/core";
import { WalletDetails } from "./WalletDetails";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import { WebWalletConnector } from "@argent/starknet-react-webwallet-connector";
import { ConnectButton } from "./ConnectButton";
import { constants } from "starknet";

/**
 * Map a target URL to a network ID
 * http://localhost:3005 -> goerli-alpha
 * https://web.dev.argent47.net -> goerli-alpha-2
 * https://web.hydrogen.argent47.net -> goerli-alpha
 * https://web.staging.argent47.net -> mainnet-alpha
 * https://web.argent.xyz -> mainnet-alpha
 */
const WW_URL = "https://web.hydrogen.argent47.net";

const Content: FC = () => {
  const { account, connector } = useAccount();
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!account || !connector ? (
        <ConnectButton />
      ) : (
        <WalletDetails
          wallet={{
            account: account as ConnectedStarknetWindowObject["account"],
            name: connector.name,
            chainId: constants.StarknetChainId.SN_GOERLI,
          }}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <StarknetConfig
      connectors={[
        new InjectedConnector({ options: { id: "braavos" } }),
        new InjectedConnector({ options: { id: "argentX" } }),
        new WebWalletConnector({
          url: WW_URL,
        }) as unknown as Connector,
      ]}
    >
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-4xl font-bold">Some Cool Dapp!</h1>
        <Content />
      </div>
    </StarknetConfig>
  );
}

export default App;
