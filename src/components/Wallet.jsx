import React, { useState, useEffect } from "react";
import WalletLogin from './WalletLogin';
import WalletTransaction from "./WalletTransactions";
import '../assets/Wallet.css';
import { WalletAPI } from "../api/Wallet";

function Wallet() {
    const [wallet, setWallet] = useState(null);

    // Load wallet data from local storage on component mount
    useEffect(() => {
        const walletData = localStorage.getItem("wallet");
        if (walletData) {
            setWallet(JSON.parse(walletData));
        }
    }, []);

    // Handle wallet initialization form submission
    const handleWalletSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const initialBalance = event.target.initialBalance.value;

        const newWallet = await WalletAPI.setup(username, initialBalance);
        console.log('newwallet', newWallet);
        let error = document.querySelector('#error-wallet');

        if (newWallet && newWallet.success === false) {
            const myForm = document.querySelector('#wallet-login-form');
            const myInput = document.querySelector('#username');
            if (!error) {
                const error = document.createElement('p');
                error.id = 'error-wallet';
                error.textContent = newWallet.message;
                myForm.insertBefore(error, myInput.nextSibling);
            }
            return;
        }

        setWallet(newWallet);
        localStorage.setItem("wallet", JSON.stringify(newWallet));
    };

    // Handle transaction form submission
    const handleTransactionSubmit = async (event) => {
        event.preventDefault();

        const newTransaction = {
            amount: Number(event.target.transactionAmount.value),
            type: event.target.transactionType.value,
            description: event.target.transactionDescription.value
        };
        const newBalance = newTransaction.type === "CREDIT" ? wallet.balance + newTransaction.amount : wallet.balance - newTransaction.amount;
        let error = document.querySelector('#error-transaction');

        if (newBalance < 0) {
            const myForm = document.querySelector('#wallet-transaction-form');
            const myInput = document.querySelector('#transaction-amount');
            if (!error) {
                const error = document.createElement('p');
                error.id = 'error-transaction';
                error.textContent = 'Insufficient Balance!';
                myForm.insertBefore(error, myInput.nextSibling);
            }
            return;
        }

        if (error) {
            error.remove();
        }

        newTransaction.amount = newTransaction.type === "CREDIT" ? newTransaction.amount : -newTransaction.amount;

        const updatedTransaction = await WalletAPI.transact(wallet.id, newTransaction.amount, newTransaction.description);

        const updatedWallet = { ...wallet, balance: updatedTransaction.balance };
        setWallet(updatedWallet);
        localStorage.setItem("wallet", JSON.stringify(updatedWallet));
    };

    // Render wallet initialization form if no wallet is configured
    if (!wallet) {
        return (
            <div>
                <WalletLogin handleWalletSubmit={handleWalletSubmit} />
            </div>
        );
    }

    // Render transaction form if wallet is configured
    return (
        <div>
            <WalletTransaction
                wallet={wallet}
                handleTransactionSubmit={handleTransactionSubmit}
            />
        </div>
    );
}

export default Wallet;
