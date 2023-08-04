import { useConnectors } from "@starknet-react/core";
import { FC } from "react";

export const ConnectButton: FC = () => {
  const { connect, connectors } = useConnectors();

  return (
    <ul>
      {connectors.map((connector) => (
        <li key={connector.id}>
          <button onClick={() => connect(connector)}>
            Connect {connector.id}
          </button>
        </li>
      ))}
    </ul>
  );
};
