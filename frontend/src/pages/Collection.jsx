import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products,search,showSearch}= useContext(ShopContext);
  const [showFilter,setShowFilter] =useState(false); 
  const [filterProduts,setFilterproducts] =useState([]);
  const [category,setCategory] =useState([]);
  const [subCategory,setSubcategory] =useState([]);
  const [sortType,setSortType] = useState('relavant');

  const toggleCategory =(e)=>{

    if(category.includes(e.target.value)){
        setCategory(prev =>prev.filter(item=> item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
    console.log(category)
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
        setSubcategory(prev => prev.filter(item => item !== e.target.value));
    } else {
        setSubcategory(prev => [...prev, e.target.value]);
    }
    
};


  const applyfilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
        productsCopy = productsCopy.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }

    setFilterproducts(productsCopy);
}

  const sortProducts = ()=>{

    let fpCopy =filterProduts.slice();
    switch(sortType){
      case 'low-high':
        setFilterproducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
        case 'high-low':
          setFilterproducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;
          default:
            applyfilter();
            break;

    }

  }


  // useEffect(()=>{

  //     setFilterproducts(products);
  // },[])

  useEffect(()=>{
      applyfilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProducts();

  },[sortType])
 

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ?'rotate-90' :' '}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-gray-700 text-sm font-light'>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
              </p>
          </div>


        </div>

        {/* Sub category */}
        
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-gray-700 text-sm font-light'>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3 ' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
              </p>
          </div>


        </div>

      </div>

      {/* Right Side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* sort */}
          <select  onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2' >
          <option value="relavant">Sort by:Relavant</option>
          <option value="low-high">Sort by:Low To High</option>
          <option value="high-low">Sort by:High to Low </option>
            
             </select>

        </div>


        {/* Map proucts */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols gap-4 gap-y-6'>
            {
              filterProduts.length > 0
              ? filterProduts.map((item, index) => (
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} images={item.images} />
              ))
              : <p>No products found.</p>
            }

        </div>

      </div>

    </div>
  )
}

export default Collection
