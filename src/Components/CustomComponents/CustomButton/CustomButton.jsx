import React from 'react'

import './CustomButton.css'

const CustomButton = ({text,handleClick,style,isDissabled}) => {
  return <>
  <button 
  className='buttonStyle'
  style={style}
  disabled={isDissabled}
  onClick={handleClick}
  >
    {text}
  </button>
  </>
}

export default CustomButton
