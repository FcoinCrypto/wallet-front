import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/App.css'
import Wallet from './components/Wallet'
import Transactions from './components/Transactions'
import { WalletAPI } from './api/Wallet'

function App() {
  const [wallet, setWallet] = useState(null)

  // Load wallet data from local storage on component mount
  useEffect(() => {
    const walletData = localStorage.getItem('wallet')
    if (walletData) {
      setWallet(JSON.parse(walletData))
    }
  }, [])

  // Handle wallet initialization form submission
  const handleWalletSubmit = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const initialBalance = event.target.initialBalance.value

    const newWallet = await WalletAPI.setup(username, initialBalance)
    let error = document.querySelector('#error-wallet')

    if (newWallet && newWallet.success === false) {
      const myForm = document.querySelector('#wallet-login-form')
      const myInput = document.querySelector('#username')
      if (!error) {
        const error = document.createElement('p')
        error.id = 'error-wallet'
        error.textContent = newWallet.message
        myForm.insertBefore(error, myInput.nextSibling)
      }
      return
    }

    setWallet(newWallet)
    localStorage.setItem('wallet', JSON.stringify(newWallet))
  }

  // Handle transaction form submission
  const handleTransactionSubmit = async (event) => {
    event.preventDefault()

    const newTransaction = {
      amount: Number(event.target.transactionAmount.value),
      type: event.target.transactionType.value,
      description: event.target.transactionDescription.value,
    }
    const newBalance =
      newTransaction.type === 'CREDIT'
        ? wallet.balance + newTransaction.amount
        : wallet.balance - newTransaction.amount
    let error = document.querySelector('#error-transaction')

    if (newBalance < 0) {
      const myForm = document.querySelector('#wallet-transaction-form')
      const myInput = document.querySelector('#transaction-amount')
      if (!error) {
        const error = document.createElement('p')
        error.id = 'error-transaction'
        error.textContent = 'Insufficient Balance!'
        myForm.insertBefore(error, myInput.nextSibling)
      }
      return
    }

    if (error) {
      error.remove()
    }

    newTransaction.amount =
      newTransaction.type === 'CREDIT'
        ? newTransaction.amount
        : -newTransaction.amount

    const updatedTransaction = await WalletAPI.transact(
      wallet.id,
      newTransaction.amount,
      newTransaction.description
    )

    const updatedWallet = { ...wallet, balance: updatedTransaction.balance }
    setWallet(updatedWallet)
    localStorage.setItem('wallet', JSON.stringify(updatedWallet))
  }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Wallet
                wallet={wallet}
                handleWalletSubmit={handleWalletSubmit}
                handleTransactionSubmit={handleTransactionSubmit}
              />
            }
          />
          <Route
            path="transactions"
            element={<Transactions wallet={wallet} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

/*
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
*/
