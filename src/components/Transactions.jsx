/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import { WalletAPI } from '../api/Wallet'
import TransactionsTable from './TransactionsTable'
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])
  // console.log('transactions props', props)

  useEffect(() => {
    if (props.wallet !== null) {
      // eslint-disable-next-line no-inner-declarations
      ;(async function () {
        const transactionsList = await WalletAPI.transactions(
          props.wallet.id,
          0
        )
        console.log('transactions list api result', transactionsList)
        setTransactions(transactionsList)
      })()
    }
  }, [])

  console.log('transactions list state', transactions)

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
    ],
    []
  )

  if (props.wallet !== null) {
    return (
      <div>
        <h1>Transactions for {props.wallet.name}</h1>
        <Styles>
          <TransactionsTable columns={columns} data={transactions} />
        </Styles>
      </div>
    )
  }

  return (
    <div>
      <h1>Transactions</h1>
    </div>
  )
}

export default Transactions
