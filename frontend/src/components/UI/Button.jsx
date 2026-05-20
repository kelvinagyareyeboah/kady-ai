import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  loading = false,
  icon: Icon,
  ...props 
}) => {
  const baseStyle = 'btn inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  }
  
  const sizes = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  }

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'btn-disabled' : ''} ${className}`

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner spinner-small">
          <span className="spinner-inner"></span>
        </span>
      )}
      {Icon && !loading && <Icon size={20} className={children ? "mr-2" : ""} />}
      {children && <span>{children}</span>}
    </button>
  )
}

export default Button