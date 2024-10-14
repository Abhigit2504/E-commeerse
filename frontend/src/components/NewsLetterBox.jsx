import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler=(event)=>{
    event.preventDefault();
    }
  return (
    <div className='text-center '>
      <p className='text-2xl font-medium text-gray-800'>Subscribe Now for 20% off</p>
      <p className='text-gray-400 mt-3'> This is the text that used for the just as sample</p>
        <form onSubmit={onSubmitHandler} className='w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='m:5px rounded sm:flex-1 outline-none ' type="email" placeholder='Enter your e-mail id' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>


        </form>


    </div>
  )
}

export default NewsLetterBox
