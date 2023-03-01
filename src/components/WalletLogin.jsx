import React from "react";

function WalletLogin(props) {
    return (
        <div className="wallet-container">
            <h1>Welcome to My Wallet</h1>
            <div id="wallet-login-form" className="wallet-form">
                <form onSubmit={props.handleWalletSubmit} className="form-group">
                    <label>
                        Username:
                        <input id="username" type="text" name="username" required />
                    </label>
                    <br />
                    <label>
                        Initial Balance:
                        <input type="number" name="initialBalance" />
                    </label>
                    <br />
                    <button type="submit">Create Wallet</button>
                </form>
            </div>
        </div>
    );
}

export default WalletLogin;