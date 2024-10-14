import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} =useContext(ShopContext);
  const [formData ,setFormData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(event) =>{
    const name =event.target.name;
    const value = event.target.value

    setFormData(data =>({...data,[name]:value}))
  }

 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
  
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };
  
      // console.log(orderData); // Log orderData to check the structure
      // console.log(`${backendUrl}/api/order/place`);
  
      switch (method.toLowerCase()) { // Fix method case sensitivity
        case 'cod':
          // console.log(backendUrl)
          const response = await axios.post(`http://localhost:4000/api/order/place`, orderData, { headers: { token } });
          // console.log(response.data); // Log response data
          if (response.data.success) {
            setCartItems({});
            toast(response.data.message)
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
  
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error("Error:", error);
      }
      toast.error("There was an error placing your order.");
    }
  };
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -----left side */}
      <div className='felx flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='First Name' type="text" />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='Last Name' type="text" />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3 ' placeholder='Email Address' type="email" />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  mt-3' placeholder='Street' type="text" />
          <div className='flex gap-3 mt-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='City' type="text" />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='State' type="text" />
          </div>
          <div className='flex gap-3 mt-3'>
            <input required onChange={onChangeHandler} name='pincode' value={formData.pincode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='Pincode' type="number" />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder='Country' type="text" />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded mt-3 py-1.5 px-3.5 w-full  ' placeholder='Phone' type="number" />
      </div>
      
      {/* ------------Right side */}
      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
              <CartTotal/>
          </div>
          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* --pay ment selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3 border rounded-full ${method == 'stripe' ? 'bg-green-400' :''}`}></p>
                    <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('razorapay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3 border rounded-full ${method == 'razorapay' ? 'bg-green-400' :''}`}></p>
                    <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3 border rounded-full ${method == 'cod' ? 'bg-green-400' :''}`}></p>
                    <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>
      </div>
    </form>
    
  )
}

export default PlaceOrder