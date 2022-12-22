import './App.css';
import Login from './components/Login';
import { createContext, useState, useEffect } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Global from './components/Global';
import Rec from './components/Rec';
import Send from './components/Send';
import Recent from './components/Recent';
import { ethers } from 'ethers';
import abi from './payatm/payatm.json'
import Erc from './components/Erc';
import SendEther from './components/SendEther';

export const AppState = createContext()


function App() {
  const { ethereum } = window;
  const [login, setLogin] = useState(false)
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('');
  const [showErc, setShowErc] = useState(false);
  const [ercTokenAddress, setErcTokenAddress] = useState('');
  const [ercLoading, setErcLoading] = useState(false);
  const [tokenChanged, setTokenChanged] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txLoading, setTxLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [Esymbol, setESymbol] = useState('');
  const [Ebalance, setEBalance] = useState('');
  const [Ecurrency, setECurrency] = useState('');

 
  const paypalContractAddress='0x0f95e45A22F0776D33cB586643c68821d426BA09'



  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const ERCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)"
  ]

  // Contracts 
  const ERCContract = new ethers.Contract(ercTokenAddress, ERCABI, provider);

   
  const selectToken = async () => {
    try {
      setErcLoading(true);
      const name = await ERCContract.name();
      const balance = await ERCContract.balanceOf(address);
      const symbol = await ERCContract.symbol();
      setEBalance(ethers.utils.formatEther(balance))
      setESymbol(symbol)
      setECurrency(name)
      setTokenChanged(true);
      setErcLoading(false);
    }
   catch (error) {
      setError(error.message)


    }
  }
  const paypalContract = new ethers.Contract(paypalContractAddress, abi.abi, signer);

  const transferAmount = async () => {
    setMessage('');
    setTxLoading(true);
    try {
      if (tokenChanged) {
        const tx = await ERCContract.transfer(recipientAddress, ethers.utils.parseEther(amount));
        await tx.wait();
        selectToken();


      } else {
        const tx = await paypalContract._transfer(recipientAddress, symbol, {
          value: ethers.utils.parseEther(amount)
        });

        await tx.wait();
        getBal();
      }

      setMessage("Transaction Sucessfull!")
      setAmount('');
    } catch (error) {
      setError(error.message)
    }

    setTxLoading(false);

  }


  const removeToken = async () => {
    try {
      if (chain === "Goerli") {
        setChain("Goerli")
        setCurrency('Goerli')
        setSymbol('Geth')
      }
      if (chain === "Polygon") {
        setChain("Polygon")
        setCurrency('Matic')
        setSymbol('Matic')
      }

      setErcTokenAddress('');
      setShowErc(false);
      setTokenChanged(false);
      getBal();
    } catch (error) {
      setError(error.message)
    }
  }

  async function getBal() {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    console.log(ethers.utils.formatEther(balance))
    setBalance(ethers.utils.formatEther(balance))
  }


  getBal()
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();

  useEffect(() => {

    ethereum.on("chainChanged", async (chainId) => {
      if (chainId === "0x5") {
        setChain("Goerli")
        setCurrency('Goerli')
        setSymbol('Geth')
      }
      if (chainId === "0x13881") {
        setChain("Polygon")
        setCurrency('Matic')
        setSymbol('Matic')
      }


    })

    ethereum.on("accountsChanged", async (accounts) => {
      setAddress(accounts[0])

    })

  }, [])
  return (
    <AppState.Provider value={{transferAmount, removeToken, selectToken, login, setLogin, chain, setChain, address, setAddress, symbol, setSymbol, balance, setBalance, currency, setCurrency, getBal, showErc, setShowErc, ercTokenAddress, setErcTokenAddress, tokenChanged, setTokenChanged, error, setError, ercLoading, setErcLoading, recipientAddress, setRecipientAddress, amount, setAmount, paypalContract,txLoading, setTxLoading,message, setMessage, Esymbol, setESymbol, Ebalance, setEBalance, Ecurrency, setECurrency }} >
      <div className="App">

        <Router>
          {!login ?
            <Login /> :
            <>
              <Header />

            </>

          }


          <Routes>

            <Route path="/" element={<Main />} />
            <Route path="/rec" element={<Rec />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/send" element={<Send />} />
            <Route path="/global" element={<Global />} />
            <Route path="/erc" element={<Erc />} />
            <Route path="/sendether" element={<SendEther />} />
          </Routes>

        </Router>


      </div>


    </AppState.Provider>



  );
}

export default App;
