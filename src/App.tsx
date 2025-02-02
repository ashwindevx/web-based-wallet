import "./App.css";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [menmonic, setMnemonic] = useState<string>("");

  return (
    <>
      <div>
        <input type="text" value={menmonic} />
        <button
          onClick={async function () {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
        >
          Create seed phrase
        </button>
        <EthWallet mnemonic={menmonic} />
      </div>
    </>
  );
}

export default App;
