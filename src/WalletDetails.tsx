import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { FC, useState } from "react";
import { number, stark, uint256 } from "starknet";

export const WalletDetails: FC<{ wallet: ConnectedStarknetWindowObject }> = ({
  wallet,
}) => {
  const [txHash, setTxHash] = useState<string>();

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
          {/* show row with title "Transfer eth to self" and a button as content */}
          <tr>
            <td className="border px-4 py-2">Transfer eth to self</td>
            <td className="border px-4 py-2">
              {!txHash ? (
                <button
                  onClick={async () => {
                    const tx = await wallet.account.execute({
                      contractAddress:
                        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", // eth contract address
                      entrypoint: "transfer", // eth contract entrypoint
                      calldata: stark.compileCalldata({
                        to: wallet.account.address,
                        value: {
                          type: "struct",
                          ...uint256.bnToUint256(number.toBN(400000000000)),
                        },
                      }),
                    });

                    console.log("transaction submitted", tx.transaction_hash);
                    setTxHash(tx.transaction_hash);
                  }}
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:opacity-50"
                >
                  Transfer
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-green-500">Transaction submitted</p>
                  <p className="text-green-500">{txHash}</p>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
