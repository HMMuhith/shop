import React, { useState } from 'react'
import { PiDotOutlineDuotone } from "react-icons/pi";

const ImageSlider = ({imageurl}) => {
    const [index,setIndex]=useState(0)
  return (
    <>
<img src={imageurl(index)} alt="" />
<div><PiDotOutlineDuotone/></div>
    </>
  )
}

export default ImageSlider