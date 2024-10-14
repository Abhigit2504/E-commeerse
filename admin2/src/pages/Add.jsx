import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct
import axios from 'axios';
import { backEndUrl } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB size limit
      toast.error("File size exceeds the 5MB limit.");
      return false;
    }

    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backEndUrl + '/api/product/add-product', formData, { headers: { token } });

      if (response.data && response.data.success) {
        toast.success('Product added successfully!');
        // Reset form fields after successful submission
        setName('');
        setDescription('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice('');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleImageChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setter(file);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        {/* Upload Image Section */}
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={handleImageChange(setImage1)} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={handleImageChange(setImage2)} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={handleImageChange(setImage3)} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={handleImageChange(setImage4)} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        {/* Product name input */}
        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        {/* Product description input */}
        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write here' required />
        </div>

        {/* Product category, subcategory, and price inputs */}
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subcategory} className='w-full px-3 py-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' required />
          </div>
        </div>

        {/* Product sizes selection */}
        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                <p className={`${sizes.includes(size) ? "bg-green-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best seller checkbox */}
        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
          <label className='cursor-pointer' htmlFor="bestseller">Add to best seller</label>
        </div>

        {/* Submit button */}
        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
      </form>
    </div>
  );
}

export default Add;
