import React from "react";
import { ConnectButton } from "@web3uikit/web3";
function Header() {
  return (
    <div className="border-b-2 p-5 flex flex-row">
      <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false}></ConnectButton>
      </div>
    </div>
  );
}

export default Header;
