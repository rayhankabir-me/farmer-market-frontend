"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();
 
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);
 
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/cart/getcart`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
 
        const { CartId, CartItems } = response.data;
 
        if (CartItems && CartItems.length > 0) {
          setCartItems(CartItems);
        } else {
          setError("You don't have anything in the cart.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("You are not authorized. Please log in.");
        } else {
          setError("Something went wrong. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };
 
    if (accessToken) {
      fetchCartItems();
    }
  }, [accessToken]);
 
  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
 
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/cart/remove-product/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCartItems((prevItems) => prevItems.filter((item) => item.ItemId !== itemId));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
 
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
 
    const itemToUpdate = cartItems.find((item) => item.ItemId === itemId);
    const newTotalPrice = (itemToUpdate.TotalPrice / itemToUpdate.Quantity) * newQuantity;
 
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/cart/edit-item`,
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
 
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.TotalPrice,
    0
  );
 
  const handleCheckout = () => {
    const cartId = cartItems[0]?.CartId; // Get CartId from the first item
    const queryParams = new URLSearchParams({
      cartId: cartId, // Pass CartId to payment page
      cartItems: JSON.stringify(cartItems.map(item => ({
        ItemId: item.ItemId,
        ProductName: item.ProductName,
        Quantity: item.Quantity,
        TotalPrice: item.TotalPrice,
      }))),
      grandTotal: grandTotal.toString(),
    });
 
    router.push(`/dashboard/payment?${queryParams.toString()}`);
  };
 
  if (loading) {
    return <div>Loading cart items...</div>;
  }
 
  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }
 
  return (
    <div className="p-4 ml-64">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-center text-blue-200 mr-2">
          Your Cart
        </h2>
        <i className="fas fa-shopping-cart text-blue-200 text-2xl"></i>
      </div>
 
      <div className="flex flex-col gap-6 ml-4">
        {cartItems.map((item) => (
          <div
            key={item.ItemId}
            className="bg-blue-300 text-white shadow-lg rounded-lg p-6 relative"
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
 
            <button
              onClick={() => handleDelete(item.ItemId)}
              className="absolute right-4 top-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
 
      <div className="mt-6 p-4 bg-blue-400 text-white font-bold text-lg rounded-lg">
        <div className="flex justify-end mr-3">
          <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
      </div>
 
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
 
export default Cart;