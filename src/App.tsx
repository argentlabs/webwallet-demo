import { useEffect, useState } from "react";
import {
  connect,
  disconnect,
  ConnectedStarknetWindowObject,
} from "@argent/get-starknet";
import { WalletDetails } from "./WalletDetails";

function App() {
  const [connection, setConnection] = useState<
    ConnectedStarknetWindowObject | undefined
  >();

  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({ modalMode: "neverAsk" }); // try to reconnect to a previously used wallet

      if (connection && connection.isConnected) {
        setConnection(connection);
      }
    };
    connectToStarknet();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Some Cool Dapp!</h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        {!connection ? (
          <button
            onClick={async () => {
              const connection = await connect();

              if (connection && connection.isConnected) {
                setConnection(connection);
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect wallet
          </button>
        ) : (
          <>
            <WalletDetails wallet={connection} />
            <button
              onClick={async () => {
                await disconnect();
                setConnection(undefined);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
