import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../assets/Wallet.css';

function WalletTransaction(props) {
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("CREDIT");
    const [transactionDescription, setTransactionDescription] = useState("");

    const handleTransactionSubmit = async (event) => {
        props.handleTransactionSubmit(event);
        setTransactionAmount("");
        setTransactionDescription("");
    }

    return (
        <div className="wallet-container">
            <h1>Welcome, {props.wallet.name}!</h1>
            <h3>Balance: ${props.wallet.balance}</h3>
            <div id="wallet-transaction-form" className="wallet-form">
                <form onSubmit={handleTransactionSubmit} className="form-group">
                    <label>
                        Transaction Amount :
                        <input id="transaction-amount" name="transactionAmount" type="number" value={transactionAmount} onChange={(event) => setTransactionAmount(event.target.value)} required />
                    </label>
                    <br />
                    <label>
                        Transaction Type :
                        <select value={transactionType} name="transactionType" onChange={(event) => setTransactionType(event.target.value)}>
                            <option value="CREDIT">Credit</option>
                            <option value="DEBIT">Debit</option>
                        </select>
                    </label>
                    <label>
                        Transaction Description : 
                        <input name="transactionDescription" type="text" value={transactionDescription} onChange={(event) => setTransactionDescription(event.target.value)} required />
                    </label>
                    <br />
                    <button type="submit">Submit Transaction</button>
                </form>
            </div>
            <Link to="/transactions">See all Transactions</Link>
        </div>
    );
}

export default WalletTransaction