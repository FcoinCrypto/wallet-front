/* eslint-disable react/prop-types */
import React from 'react'
import WalletLogin from './WalletLogin'
import WalletTransaction from './WalletTransactions'
import '../assets/Wallet.css'

function Wallet(props) {
  // Render wallet initialization form if no wallet is configured
  if (!props.wallet) {
    return (
      <div>
        <WalletLogin handleWalletSubmit={props.handleWalletSubmit} />
      </div>
    )
  }

  // Render transaction form if wallet is configured
  return (
    <div>
      <WalletTransaction
        wallet={props.wallet}
        handleTransactionSubmit={props.handleTransactionSubmit}
      />
    </div>
  )
}

export default Wallet
