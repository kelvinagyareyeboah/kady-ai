import React from 'react'

const Card = ({ children, className = '', variant = 'default' }) => {
  const baseStyle = 'rounded-lg border'
  
  const variants = {
    default: 'bg-gray-900 border-gray-800',
    elevated: 'bg-gray-900 border-gray-800 shadow-lg'
  }

  const classes = `${baseStyle} ${variants[variant]} ${className}`

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card