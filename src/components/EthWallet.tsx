import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { getEthBalance } from "../services/EthBalance";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [address, setAddress] = useState<string[]>([]);
  const [balance, setBalance] = useState<{ [key: string]: string }>({});

  const addEthWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic); // extracting the seed from the mnemonic
    const derivationPath = `m/44'/60'/${currIndex}'/0'`; // derivation path
    const hdNode = HDNodeWallet.fromSeed(seed); // creating a HDNodeWallet from the seed
    const child = hdNode.derivePath(derivationPath); // deriving the child node from the HDNodeWallet
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrIndex(currIndex + 1);
    setAddress([...address, wallet.address]);
  };

  const getBalance = async (index: number) => {
    const addr = address[index];
    const balance = await getEthBalance(index, addr);
    setBalance((prevBalances) => ({
      ...prevBalances,
      [addr]: balance,
    }));
  };

  return (
    <div>
      <button onClick={addEthWallet}>Add ETH wallet</button>
      {address.map((addr, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{addr}</div>
          <button onClick={() => getBalance(index)}>Get balance</button>
          <p>Balance: {balance[addr] || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};
