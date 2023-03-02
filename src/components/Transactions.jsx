/* eslint-disable react/prop-types */
import React from 'react'

const Transactions = (props) => {
  return (
    <div>
      <h1>Transactions for {props.wallet.name}</h1>
    </div>
  )
}

export default Transactions
