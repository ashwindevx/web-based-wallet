import { ethers } from "ethers";

export const getEthBalance = async (id: number, address: string) => {
  const url = `https://eth-mainnet.g.alchemy.com/v2/halL2ZhnlOJSGLdxtwB3gINKzVeN9N5k`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: id,
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
    });
    const data = await res.json();
    if (data.result) {
      const balanceInEth = ethers.formatUnits(data.result, "ether") + " ETH";
      return balanceInEth;
    }
    return "0";
  } catch (error) {
    console.error(error);
    return "0";
  }
};
