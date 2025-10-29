import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#E2F4FF] '>
            <div className='flex justify-between max-w-[75vw] mx-auto border border-transparent
            rounded-2xl bg-white p-12'>
              <div className='font-bold text-2xl text-[#1B5A7D]'>Subscribe Newletter</div>
              <div><input type="email" name="email" id="email" />Email Address</div>
              <div>
                <div>call Logo</div>
                <div>Call us at +92 000 0000000</div>
              </div>
            </div>
            <div></div>
    </div>
  )
}

export default Footer