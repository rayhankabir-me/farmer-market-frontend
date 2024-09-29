"use client";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Payment = () => {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const items = JSON.parse(searchParams.get("cartItems") || "[]");
    const total = parseFloat(searchParams.get("grandTotal") || "0");
    const cartIdFromParams = searchParams.get("cartId");
    console.log("Cart ID:", cartIdFromParams);

    setCartItems(items);
    setGrandTotal(total);
    setCartId(cartIdFromParams);
  }, [searchParams]);

  const handlePlaceOrder = () => {
    const token = Cookies.get("Token");

    if (!paymentMethod || !address) {
      alert("Please select a payment method and enter your address.");
      return;
    }

    const orderData = {
      OrderDate: new Date().toISOString(),
      PaymentMethod: paymentMethod,
      PaymentStatus: "Paid",
      DeliveryAddress: address,
      OrderStatus: "Pending",
      CartId: cartIdFromParams,
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Order placed successfully!");
        } else {
          alert("Failed to place order. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="p-4 ml-64">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-center text-blue-200 mr-2">
          Payment Summary
        </h2>
      </div>

      <div className="flex flex-col gap-4 ml-4">
        <table className="table-auto w-full bg-blue-100 text-blue-900 rounded-lg border-5 border-blue-500">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-4 py-2 border-5 border-blue-500">Product</th>
              <th className="px-4 py-2 border-5 border-blue-500">Quantity</th>
              <th className="px-4 py-2 border-5 border-blue-500">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.ItemId}>
                <td className="border-5 border-blue-500 px-4 py-2">
                  {item.ProductName}
                </td>
                <td className="border-5 border-blue-500 px-4 py-2">
                  {item.Quantity}
                </td>
                <td className="border-5 border-blue-500 px-4 py-2">
                  ${item.TotalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-400 text-white font-bold text-lg rounded-lg">
        <div className="flex justify-end mr-3">
          <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-300 text-white rounded-lg">
        <h3 className="text-lg font-bold mb-4">Payment Method</h3>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              className="form-radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Card</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Bkash"
              className="form-radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Bkash</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Nogod"
              className="form-radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Nogod</span>
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-300 text-white rounded-lg">
        <h3 className="text-lg font-bold mb-4">Address</h3>
        <input
          type="text"
          className="w-full p-2 text-blue-900 rounded"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-5"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
