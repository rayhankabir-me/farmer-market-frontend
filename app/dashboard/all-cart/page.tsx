"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Fetch access token from cookies
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  // Fetch cart items from the API
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(
          "http://localhost:54939/api/cart/getcart",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCartItems(response.data.CartItems);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchCartItems();
    }
  }, [accessToken]);

  // Function to handle deleting a cart item
  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:54939/api/cart/remove-product/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Remove the deleted item from the UI
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.ItemId !== itemId)
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } else {
      console.log("Delete action cancelled.");
    }
  };

  // Function to handle quantity update
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent decreasing below 1

    const itemToUpdate = cartItems.find((item) => item.ItemId === itemId);
    const newTotalPrice =
      (itemToUpdate.TotalPrice / itemToUpdate.Quantity) * newQuantity;

    try {
      await axios.put(
        `http://localhost:54939/api/cart/edit-item`,
        {
          itemId: itemId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the UI with the new quantity and total price
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.ItemId === itemId
            ? { ...item, Quantity: newQuantity, TotalPrice: newTotalPrice }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate grand total
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.TotalPrice,
    0
  );

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (error) {
    return <div>Error loading cart items: {error.message}</div>;
  }

  return (
    <div className="p-4 ml-64">
      {/* Centered Header */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-center text-blue-300 mr-2">
          Your Cart
        </h2>
        <i className="fas fa-shopping-cart text-blue-300 text-2xl"></i>
      </div>

      <div className="flex flex-col gap-6 ml-4">
        {cartItems.map((item) => (
          <div
            key={item.ItemId}
            className="bg-blue-500 text-white shadow-lg rounded-lg p-6 relative"
            style={{ margin: "5px" }}
          >
            <h3 className="text-xl font-semibold mb-2">{item.ProductName}</h3>
            <div className="flex items-center mb-1">
              <button
                onClick={() =>
                  handleQuantityChange(item.ItemId, item.Quantity - 1)
                }
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                -
              </button>
              <p className="mx-4">Quantity: {item.Quantity}</p>
              <button
                onClick={() =>
                  handleQuantityChange(item.ItemId, item.Quantity + 1)
                }
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                +
              </button>
            </div>
            <p className="font-semibold">
              Total Price: ${item.TotalPrice.toFixed(2)}
            </p>

            {/* Delete button on the right */}
            <button
              onClick={() => handleDelete(item.ItemId)}
              className="absolute right-4 top-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Grand Total Bar */}
      <div className="mt-6 p-4 bg-blue-600 text-white font-bold text-lg rounded-lg">
        <div className="flex justify-end mr-3">
          <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
}
