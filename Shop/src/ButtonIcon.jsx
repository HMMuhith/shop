import React from 'react'

const ButtonIcon=({children,onClick,className})=> {
  return (
    <button className={className} onClick={onClick}>{children}</button>
  )
}

export default ButtonIcon 