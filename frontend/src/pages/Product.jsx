// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {

//   const {productId} =useParams();
//   const {products,currency,addToCart} =useContext(ShopContext);
//   const [productData,setProductData] = useState(false);
//   const [image,setImage] =useState(' ')
//   const [size,setSize] =useState('');
//   const fetchProductData =async()=>{
//     products.map((item)=>{
//       if(item._id == productId){
//         setProductData(item)
//         setImage(item.image[0])
//         console.log(item);
        
//         return null;

//       }
//     })
//   }
//   useEffect(()=>{
//     fetchProductData();
//   },[productId])
//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opactiy ease-in duration-500 opactiy-100'>
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//           {/*------------p images */}
//           <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//             <div className='felx flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
//                 {
//                   productData.image.map((item,index)=>(
//                       <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt="" />
//                   ))
//                 }
//             </div>
//             <div className='w-full sm:w-[80%]'>
//                   <img className='w-full h-auto' src={image} alt="" />
//             </div>
//           </div>

//           {/* ---------PRODUCT INFO */}

//           <div className='flex-1'>
//             <h1 className='font-medium text-2xl mt-2'>
//               {productData.name}
//             </h1>
//             <div className='flex items-center gap-1 mt-2'>
//                   <img src={assets.star_icon} alt="" className='w-3 5' />
//                   <img src={assets.star_icon} alt="" className='w-3 5'/>
//                   <img src={assets.star_icon} alt="" className='w-3 5'/>
//                   <img src={assets.star_icon} alt="" className='w-3 5'/>
//                   <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
//                   <p className='pl-2'>{122}</p>
//             </div>
//                   <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//                   <p className='mt-5 text-gray-40 md:w-4/5'>{productData.description}</p>
//                   <div className='flex flex-col gap-4 my-8'>
//                       <p>Select size</p>
//                       <div className='flex gap-2'>
//                             { productData.sizes.map((item,index)=>(
//                               <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size ? 'border-orange-500' : ' '}`} key={index}>{item}</button>
//                             ))}
//                       </div>
//                   </div>

//                   <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text:sm active:bg-gray-700'>
//                     ADD TO CART
//                   </button>
//                     <hr className='mt-7 sm:w-4/5 '/>
//                     <div className='text:sm text-gary-500 mt-5 felx flex-col gap-1'>
//                           <p>100% Original Product.</p>
//                           <p>Cash on delivary is availabel on this product.</p>
//                           <p>Easy return and exchange policy within 7 Days.</p>
//                     </div>

//           </div>

//       </div>
//       {/* ---description and review*/}
//           <div className='mt-20 '>
//                   <div className='flex'>
//                             <b className='border px-5 py-3 text:sm'>Description</b>
//                             <p className='border px-5 py-3 text:sm '>Reviews (122)</p>
//                   </div>
//                   <div className='flex flex-col border px-6 py-6 text-sm text-gary-500'>
//                             <p>When I generate one dummy text it returns only one line. I wish that I can choose many text instead of one line.</p><br />
//                             <p>ove this plugin! Does exactly what it is supposed to do and so far without any real issues. (You might want to review some Dummy Text generation which contains words and even sentences with a meaning and that should not suppose to happen)</p>


//                   </div>
//           </div>
// {/* ---Dosplay related products */}
// <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
//     </div>
//   ):<div className='opacity-0'></div>
// }

// export default Product

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);  // Default to null instead of false
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    const product = products.find(item => item._id == productId);
    if (product) {
      setProductData(product);
      setImage(product.images && product.images.length > 0 ? product.images[0] : '');  // Check if image array exists and has elements
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]); // Ensure products array is also a dependency

  if (!productData) {
    return <div className="opacity-0"></div>;  // Return empty div if productData is not yet loaded
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*------------ Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images && productData.images.length > 0 &&
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* --------- Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-40 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={` py-2 px-4 bg-gray-100 ${item === size ? ' border-blue-500 ' : ''}`}
                  key={index} style = {{border:`${item === size ? '1px solid blue':''}`}}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text:sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-7 sm:w-4/5" />
          <div className="text:sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 Days.</p>
          </div>
        </div>
      </div>

      {/* --- Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text:sm">Description</b>
          <p className="border px-5 py-3 text:sm ">Reviews (122)</p>
        </div>
        <div className="flex flex-col border px-6 py-6 text-sm text-gray-500">
          <p>When I generate one dummy text it returns only one line. I wish that I can choose many texts instead of one line.</p><br />
          <p>Love this plugin! Does exactly what it is supposed to do and so far without any real issues. (You might want to review some Dummy Text generation which contains words and even sentences with a meaning and that should not suppose to happen)</p>
        </div>
      </div>

      {/* --- Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
