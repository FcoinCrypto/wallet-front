import React, { useState, useEffect } from 'react';

const Transactions = () => {
    const [wallet, setWallet] = useState(null);

    // Load wallet data from local storage on component mount
    useEffect(() => {
        const walletData = localStorage.getItem("wallet");
        if (walletData) {
            setWallet(JSON.parse(walletData));
        }
    }, []);

    return (
        <div>
            <h1>Transactions for {wallet.name}</h1>
        </div>
    );
};

export default Transactions;