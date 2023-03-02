/* eslint-disable react/prop-types */
import React from 'react'

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  // Render a multi-select box
  return (
    <span>
      Search:
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

export default ColumnFilter
