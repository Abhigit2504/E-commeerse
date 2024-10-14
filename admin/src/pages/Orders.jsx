import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return; // Ensure token exists

    try {
      const response = await axios.post(
        `${backEndUrl}/api/order/list`,
        {},
        { headers: { token: localStorage.getItem('token') } } // Safely access the token from localStorage
      );

      if (response.data.success) {
        setOrders(response.data.orders);
        console.log("Orders fetched:", response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      toast.error(
        error.response?.data?.message || "Error occurred while fetching orders"
      );
    }
  };

  // Handler to update order status
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backEndUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token: localStorage.getItem('token') } } // Using localStorage token safely
      );

      if (response.data.success) {
        toast.success("Order status updated successfully!");
        await fetchAllOrders(); // Refetch orders after successful status update
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
      toast.error(
        error.response?.data?.message || "Error occurred while updating order status"
      );
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      {orders.length === 0 ? (
        <p>No orders found. Please check back later.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              {/* Safe fallback for missing image */}
              <img className="w-12" src={assets.parcel_icon} alt="Order Icon" />

              <div>
                <div>
                  {order.items.map((item, idx) => (
                    <p className="py-0.5" key={idx}>
                      {item.name || 'Unknown Item'} x {item.quantity || 0} <span>{item.size || 'N/A'}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address?.lastName || 'No Last Name'}
                </p>
                <div>
                  <p>{order.address?.street || 'No Street'},</p>
                  <p>
                    {`${order.address?.city || 'No City'}, ${order.address?.state || 'No State'}, ${order.address?.country || 'No Country'}, ${order.address?.pincode || 'No Pincode'}`}
                  </p>
                </div>
                <p>{order.address?.phone || 'No Phone'}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items?.length || 0}</p>
                <p className="mt-3">Method: {order.paymentMethod || 'Unknown'}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.Date).toLocaleDateString() || 'Unknown Date'}</p>
              </div>

              <p className="text-sm sm:text-[15px]">{currency}{order.amount || '0.00'}</p>

              <select
                className="p-2 font-semibold"
                onChange={(e) => statusHandler(e, order._id)} // Call statusHandler on status change
                value={order.status} // Bind the current status
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
