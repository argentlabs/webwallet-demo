import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { FC, useState } from "react";
import { uint256 } from "starknet";

export const WalletDetails: FC<{
  wallet: Pick<ConnectedStarknetWindowObject, "account" | "name" | "chainId">;
}> = ({ wallet }) => {
  const [txHash, setTxHash] = useState<string>();
  const [signature, setSignature] = useState<string[]>();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Wallet</td>
            <td className="border px-4 py-2">{wallet.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Address</td>
            <td className="border px-4 py-2">{wallet.account.address}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Chain id</td>
            <td className="border px-4 py-2">{wallet.account.chainId}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Actions</td>
            <td className="border px-4 py-2">
              {!txHash && !signature ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <button
                    onClick={async () => {
                      const uint256Value = uint256.bnToUint256(400000000000n);
                      const tx = await wallet.account.execute({
                        contractAddress:
                          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", // eth contract address
                        entrypoint: "transfer", // eth contract entrypoint
                        calldata: [
                          wallet.account.address,
                          uint256Value.low,
                          uint256Value.high,
                        ],
                      });

                      console.log("transaction submitted", tx.transaction_hash);
                      setTxHash(tx.transaction_hash);
                    }}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:opacity-50"
                  >
                    Transfer
                  </button>
                  <button
                    onClick={async () => {
                      const sig = await wallet.account.signMessage({
                        domain: {
                          name: "Example DApp",
                          chainId: wallet.chainId,
                          version: "0.0.1",
                        },
                        types: {
                          StarkNetDomain: [
                            { name: "name", type: "felt" },
                            { name: "chainId", type: "felt" },
                            { name: "version", type: "felt" },
                          ],
                          Message: [{ name: "message", type: "felt" }],
                        },
                        primaryType: "Message",
                        message: {
                          message: "Hello world",
                        },
                      });

                      setSignature(sig);
                    }}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:opacity-50"
                  >
                    Sign message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  {txHash ? (
                    <>
                      <p className="text-green-500">Transaction submitted</p>
                      <p className="text-green-500">{txHash}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-500">Message signed</p>
                      <p className="text-green-500 max-w-4xl">
                        ({signature?.join(", ")})
                      </p>
                    </>
                  )}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
