import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-18 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Institute of gastro and hepatopathology is India's foremost Gastro-Hepatopathology Institute. IGHP is established to propagate and enhance dissemination of histopathology knowledge and services especially in field of Gastro and Hepatopathology. of Superspecialized Gastrohepatopathology Services with us !</p>
<p>To align the input and bin icon on the same line, you can wrap the input and the bin icon inside a flex container. This will force them to align horizontally next to each other. Here's how you can modify your code:</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Welcome to Your Company Name, where passion meets innovation! Since our inception, we've been committed to delivering high-quality products/services that inspire, empower, and bring value to our customers. Our mission is to create a lasting impact by offering solutions tailored to your needs, with a focus on exceptional quality, sustainability, and customer satisfaction.</p>

          </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex felx-col gap-5'>
            <b>Quality Assurance:</b><br />
            <p className='text-gray-600'>
            At Your Company Name, quality is at the heart through to final delivery.
            </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex felx-col gap-5'>
            <b>Convenience:</b><br />
            <p className='text-gray-600'>
            At [Your Company Name], convenience is at the our service is designed with you in mind.

            </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex felx-col gap-5'>
            <b>Exeptional customer service:</b><br />
            <p className='text-gray-600'>
            At [Your Company Name], delivering exceptional customer scare, and attention.

            </p>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About
