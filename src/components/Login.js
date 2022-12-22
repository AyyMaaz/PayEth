import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { AppState } from '../App';


const Login = () => {
    const App=useContext(AppState)


    const { ethereum } = window;
    const [error, setError] = useState('');
    const [account, setAccount] = useState('');

      
   
    const LoginWallet = async () => {
        try {

           const accounts=await ethereum.request({ method: "eth_requestAccounts" })
           setAccount(true)
           App.setLogin(true)
           const chainId = await ethereum.request({method: "eth_chainId"})

           App.setAddress(accounts[0])
         
           if (chainId === "0x5") {
            App.setChain("Goerli")
            App.setCurrency('Goerli')
            App.setSymbol('Geth')
          }
          if (chainId === "0x13881") {
            App.setChain("Polygon")
            App.setCurrency('Matic')
            App.setSymbol('Matic')
          }
          
       
        }
        catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
            <img className='h-20' src='paypal.png' alt='paytm' />
            <div className='w-1/3 h-40 mt-4 bg-black bg-opacity-70 p-2 rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center'>
                <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
                { ethereum!==undefined?
                    <div onClick={LoginWallet} className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                        Connect With Metamask
                        <img className='h-10' src='metamask.png' alt='metamask' />
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center'>


                        <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                          Plz Install Metamask
                            <img className='h-10' src='metamask.png' alt='metamask' />
                        </div>

                        <p className='text-red-600 text-lg mt-2'>Login Required Metamask Extension</p>

                    </div>
                }
                <p className='text-red-600 text-lg mt-2'>{error}</p>
            </div>
        </div>
    )
}

export default Login