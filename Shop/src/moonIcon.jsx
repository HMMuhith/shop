import React from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import ThemeContext from './theme'
import { useContext, useEffect } from 'react'


const MoonIcon = () => {
  const { Dark, toggle } = useContext(ThemeContext)

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
if(Dark){
  document.querySelector('html').classList.add('dark')
  document.querySelector('input').classList.add('inputB')
}
else{
  document.querySelector('html').classList.add('light')
  
}
  }, [Dark])

  return (
    <>
    <div className='w-8 flex justify-center items-center h-8 bg-slate-700 rounded-full'>
      <ButtonIcon onClick={toggle}>{ Dark? <HiOutlineSun className='text-white text-2xl' />:<HiOutlineMoon className='text-white text-2xl'/>}</ButtonIcon>
      </div>
    </>
  )
}
export default MoonIcon
