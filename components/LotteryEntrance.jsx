import React from "react";

import { useWeb3Contract } from "react-moralis";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { abi, contractAddresses } from "../constants/index";
import { ethers } from "ethers";
import { SvgBell } from "@web3uikit/icons";
import { useNotification } from "web3uikit";
// import SvgBell from "@web3uikit/icons/dist/lib/icons/Bell";
const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0x");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromCall = (
      await getEntranceFee({
        onError: error => console.log(error),
      })
    ).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();
    // console.log(`Entrance Fee :${entranceFee}`);
    setEntranceFee(entranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleNewNotification = function (tx) {
    dispatch({
      type: "success",
      message: `Transaction Complete!`,
      title: "Tx Notification",
      position: "topR",
      //   icon: SvgBell,
    });
  };

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };
  return (
    <div className="p-5">
      {raffleAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: error => console.log(error),
              });
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              <div>Enter Raffle</div>
            )}
          </button>
          <span className="text-xl font-poppins">
            <br />
            Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")}ETH
            <br />
            Players : {numPlayers}
            <br />
            Recent Winner: {recentWinner}
          </span>
        </div>
      ) : (
        <div>No Raffle address detected...!</div>
      )}
    </div>
  );
};

export default LotteryEntrance;
