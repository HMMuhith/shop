import React from 'react'
import facebook from './newImage/communication.png'
import youtube from './newImage/youtube (1).png'
import instagram from './newImage/instagram.png'
import twitter from './newImage/twitter.png'
import linkedin from './newImage/linkedin.png'
import { NavLink } from 'react-router-dom';

const Footer = ({ style }) => {
  return (
    <>
      <div className='mb-0 shadow-md sm:h-[14.7rem] lg:w-full lg:h-[17.2rem]  lg:flex lg:flex-col  lg:justify-center lg:items-center lg:bg-neutral-950 w-full  h-24 flex flex-col mt-3 justify-center items-center lg:outline-none outline-none bg-neutral-950' >
        <p className='lg:text-white text-white sm:text-xs lg:text-lg lg:mr-66 mr-42'>&#169;<small>All Rights Reserved by Shop</small></p>
        <div className='lg:flex lg:w-56 lg:mt-4 lg:justify-between lg:items-center flex w-36 mt-2 justify-between items-center'>
          <div>
            <button><NavLink to='https://www.facebook.com/muhith.khan.988' target='_blank'><img src={facebook} className='lg:w-6 lg:h-6 w-3 h-3 ' alt="" /></NavLink>
            </button>
          </div>
          <div>
            <button><NavLink to='https://www.youtube.com/@hmmuhith7439' target='_blank'><img src={youtube} className='lg:w-6 lg:h-6 w-3 h-3 ' alt="" /></NavLink>
            </button>
          </div>
          <div>
            <button><NavLink to='https://www.instagram.com/hmmuhith/' target='_blank'><img src={instagram} className='lg:w-6 lg:h-6 w-3 h-3 ' alt="" /></NavLink>
            </button>
          </div>
          <div>
            <button><NavLink to='https://x.com/HMuhith' target='_blank'><img src={twitter} className='lg:w-6 lg:h-6 w-3 h-3 ' alt="" /></NavLink></button>
          </div>
          <div>
            <button><NavLink to='https://www.linkedin.com/in/hm-muhith-a07377154/'><img src={linkedin} className='lg:w-6 lg:h-6 w-3 h-3 ' alt="" /></NavLink></button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer

