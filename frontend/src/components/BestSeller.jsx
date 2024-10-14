// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {

//     const {products} = useContext(ShopContext);
//     const [bestSeller,setBestSeller] =useState([]);
//     useEffect(()=>{

//         const bestProduct = products.filter(item => item.bestseller == true);
//         console.log(bestProduct)
//         setBestSeller(bestProduct.slice(0,5));
//     },[products]
//     )

//   return (
//     <div className='my-10'>
//         <div className='text-center text-3xl py-8'>
//             <Title text1={'BEST'} text2={'SELLERS'}/>
//             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>one more dummy txt here as like as the same as the before</p>
//         </div>
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//             {
//                 bestSeller.map((item,index)=>(
//                     <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
//                 ))
//             }
//         </div>

//     </div>
//   )
// }

// export default BestSeller


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);  // Accessing products from context
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Wait until products are loaded
    if (products && products.length > 0) {
      // Filter products for bestseller items
      const bestProduct = products.filter(item => item.bestseller === true);
      // console.log(bestProduct);
      // Set the bestsellers to state, limiting the number to 5
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);  // Runs the effect every time products change

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          One more dummy text here as like as the same as the before
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              images={item.images}  // Ensure item.image is properly structured
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No Bestsellers available</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
