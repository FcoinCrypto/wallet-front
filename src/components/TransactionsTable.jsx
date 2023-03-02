/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react'
import { useTable, useSortBy } from 'react-table'

const TransactionsTable = ({ columns, data }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headers,
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          {headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className={
                column.isSorted
                  ? column.isSortedDesc
                    ? 'sort-desc'
                    : 'sort-asc'
                  : ''
              }
            >
              {column.render('Header')}
              {/* Add a sort direction indicator */}
              <span>
                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TransactionsTable
