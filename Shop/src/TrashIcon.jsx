import React from 'react'
import { IoTrashOutline } from "react-icons/io5";


const TrashIcon=({change})=> {
  return (
    <button type="button"  onClick={change}>
        <IoTrashOutline/>
    </button>
  )
}
export default TrashIcon

