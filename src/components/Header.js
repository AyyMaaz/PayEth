import React, { useContext, useState } from "react";
import { AppState } from "../App";
import { Link } from "react-router-dom";

const Header = () => {
    const { ethereum } = window;
    const App = useContext(AppState);
    const [showChains, setShowChains] = useState(false);


    const changeToGoerli = async () => {
        await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x5" }] })
        setShowChains(false)
    }

    const changeToPolygon = async () => {
        await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x13881" }] })
        setShowChains(false)
    }

    return (
        <div className="w-full h-1/4 pt-4 flex justify-between items-start">
            {/* Logo */}
            <img className="h-12 ml-2"        src="./MetaMask.png" alt="paypal" />


            <div className='flex justify-around text-log font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-1/2'>
      <Link to='/send'>Send</Link>
      <Link to='/rec'>Recipents</Link>
      <Link to='/global'>Global Transactions</Link>
      <Link to='/recent'>My Transactions</Link>
      {/* send */}
   
      </div>

            <div className="flex justify-between items-start">
                {/* Wallet */}
                <div className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center">
                    {App.address.slice(0, 13)}


                    {/* Chains Section */}
                    <div onClick={() => setShowChains(true)} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center">
                        {/* {App.chain === "Goerli" ? (
                            <img className="h-6 mr-2" src="ethereum-eth.svg" />
                        ) : (
                            <img className="h-6 mr-2" src="polygon.png" />
                        )} */}
                        {App.chain}

                    </div>

                    {/* All Chains */}


                    {/* Polygon */}
                    <div className={`${showChains ? "" : "hidden"} absolute right-0 z-50`}>
                        <div onClick={changeToPolygon} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center">
                            <img className="h-6 mr-2" src="polygon.png" alt="h" />
                            Mumbai
                        </div>

                        {/* Goerli */}
                        <div onClick={changeToGoerli} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center">
                            <img className="h-6 mr-2" src="ethereum-eth.svg" alt="y" />
                            Goerli
                        </div>

                        {/* Close The chains */}
                        <div onClick={() => setShowChains(false)} className="text-xl py-1 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-red-600 text-white rounded-lg flex justify-center items-center">
                            Close

                        </div>
                    </div>
                    </div>
                </div>
            </div>
            );
};

            export default Header;
