import Web3 from "web3";

const getBalance = async (): Promise<string> => {
  if (window.ethereum) {
    // Create a new web3 instance using the Metamask provider
    const web3 = new Web3(window.ethereum);
    // Get the current account's address
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const address = accounts[0];
    if (address) {
      // Get the balance of the current account

      const weiBalance = await web3.eth.getBalance(address);
      const ethBalance = web3.utils.fromWei(weiBalance, "ether");
      // Set the balance in state
      return ethBalance;
    }
  }
  return "";
};
export { getBalance };
