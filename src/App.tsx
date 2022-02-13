import { useState } from "react";
import "./App.css";
import { ReactComponent as SVG } from "./cool.svg";
import Verse from "./artifacts/contracts/Verse.sol/Verse.json";
import { ethers } from "ethers";

declare const window: any;

const verseAddress = process.env.REACT_APP_CONTRACT || "";

function App() {
  const [verse, setVerse] = useState("");
  const [input, setInput] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const handleGetVerse = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(verseAddress, Verse.abi, provider);
      const verse = await contract.getVerse();
      setVerse(verse);
      console.log(verse);
    }
  };

  const handleSetVerse = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(verseAddress, Verse.abi, signer);
      const transaction = await contract.setVerse(input);
      await transaction.wait();
      handleGetVerse();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Verse Dapp</h1>
        <p>{verse || "There is no verse set"}</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id="verse"
          placeholder="Enter your verse"
        />

        <div className="controls">
          <button onClick={handleGetVerse}>Get Verse</button>
          <button onClick={handleSetVerse}>Set Verse</button>
        </div>
      </div>
      <SVG></SVG>
    </div>
  );
}

export default App;
