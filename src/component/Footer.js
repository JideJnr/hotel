import React from 'react'

const Footer = () => {
  return (
    <footer
    className="text-center dark:bg-neutral-700 lg:text-left">
    <div className="p-4 text-center text-neutral-700 dark:text-neutral-200 grid grid-cols-1">
      © 2023 Copyright:
      <a
        className="text-neutral-800 dark:text-neutral-400"
        href="https://tailwind-elements.com/"
      >Olajide Nurudeen</a>
    </div>
  </footer>
  )
}

export default Footer