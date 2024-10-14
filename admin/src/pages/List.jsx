import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backEndUrl, currency } from '../App';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/product/list`);
      console.log('API Response:', response.data); // Log the entire response
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Fetch List Error:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backEndUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after product removal
      } else {
        toast.error(response.data.message || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Remove Product Error:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-lg font-semibold mb-3">All Products List</p>
      {list.length === 0 ? (
        <p>No products found. Please add some products.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Product Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* Product List */}
          {list.map((item, index) => {
            // Handle images
            const imageSrc = item.images && item.images.length > 0 
              ? item.images[0] 
              : '/default-image.jpg'; // Fallback to a default image if no image is available

            return (
              <div
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
                key={index}
              >
                <img src={imageSrc} className="w-12 h-12 object-cover" alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg text-red-500"
                  title="Remove product"
                >
                  &#x2716; {/* Cross mark (X) */}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default List;
