import React from 'react'

const Badge = ({label}) => {
  return (
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ">
        {label}
    </span>
  )
}

export default Badge