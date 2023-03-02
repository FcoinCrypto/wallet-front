/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import { WalletAPI } from '../api/Wallet'
import TransactionsTable from './TransactionsTable'
import ColumnFilter from './ColumnFilter'
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

  useEffect(() => {
    if (props.wallet !== null) {
      // eslint-disable-next-line no-inner-declarations
      ;(async function () {
        const transactionsList = await WalletAPI.transactions(
          props.wallet.id,
          0
        )
        setTransactions(transactionsList)
      })()
    }
  }, [props.wallet])

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Filter: ColumnFilter,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Filter: ColumnFilter,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Filter: ColumnFilter,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: ColumnFilter,
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        Filter: ColumnFilter,
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
