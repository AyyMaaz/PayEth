import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AppState } from "../App";



const SendEther = () => {
  const App = useContext(AppState);
 

  return (

    <>
     

      <div className="flex flex-col justify-center items-center text-white">
        {/* Balance */}
        <div className="flex w-4/5 justify-around items-center mt-7">
          <div onClick={() => App.setShowErc(App.showErc ? false : true)} className="flex cursor-pointer justify-center items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg">

            <h1 className="ml-2 text-lg font-medium">{App.currency}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="flex items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black rounded-lg bg-opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="ml-2 bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
            <h1 className="ml-2 text-lg font-medium">Balance :</h1>
            <h1 className="ml-2 text-lg font-medium">{App.balance.slice(0, 5)} {App.symbol}</h1>
          </div>
        </div>

        {/* Erc20 Address */}
        <div className={`${App.showErc ? '' : "hidden"} flex w-4/5 justify-between items-center mt-5`}>
          <input onChange={(e) => App.setErcTokenAddress(e.target.value)} value={App.ercTokenAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste ERC20 Token Address" />
          {App.ercLoading ?
            <div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
              <TailSpin
                width={28}
                height={28}
                color={"white"}
              />
            </div>
            : (App.tokenChanged ?
              <div onClick={App.removeToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
                Remove
              </div>
              :
              <div onClick={App.selectToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
                Select
              </div>
            )
          }
        </div>
        <div className="flex w-4/5 justify-between items-center mt-5">
          <input onChange={(e) => App.setRecipientAddress(e.target.value)} value={App.recipientAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Address" />
          <input onChange={(e) => App.setAmount(e.target.value)} value={App.amount} type={"number"} className="w-1/4 ml-4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Amount" />
        </div>

        {/* Transfer Button */}
        {App.txLoading ?
          <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
            <TailSpin
              width={30}
              height={46}
              color={'white'}
            />
          </div>
          :
          <div onClick={App.transferAmount} className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
            Transfer
          </div>
        }


        <p className="text-red-600 text-lg mt-2 px-3">{App.error}</p>
        <p className="text-green-600 text-lg mt-2 px-1">{App.message}</p>

      </div>
    </>
  );
};

export default SendEther;

