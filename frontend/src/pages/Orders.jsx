import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { orderData, loadOrderData, currency } = useContext(ShopContext);

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => {
            // Ensure the 'date' exists and is properly formatted
            const formattedDate = item.date ? new Date(item.date).toLocaleDateString() : 'N/A';

            return (
              <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    {/* Display the properly formatted date */}
                    <p>Date: <span className='text-gray-400'>{formattedDate}</span></p>
                    <p>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>

                {/* Center the status in the row */}
                <div className='flex ml-20 justify-center items-center flex-grow gap-4'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <div className="ml-auto">
                    <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Orders;
