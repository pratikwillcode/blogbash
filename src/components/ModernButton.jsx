import React from 'react'

function ModernButton({children, textColor = 'text-white', bgColor = 'blue-600'}) {
  return (
    <button className={`${textColor} bg-${bgColor} px-2 py-1 rounded-lg  border-2 hover:bg-white hover:text-${bgColor} `}>{children}</button>
  )
}

export default ModernButton