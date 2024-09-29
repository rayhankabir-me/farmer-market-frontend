"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const RequestProductView = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/RequestProduct`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRequests(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("You don't have access to this content.");
        } else {
          setError("Failed to fetch requests.");
        }
      }
    };

    if (accessToken) {
      fetchRequests();
    }
  }, [accessToken]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.ReqId}
              className="p-4 bg-blue-100 rounded-lg shadow-md"
              style={{ margin: "5px" }}
            >
              <h3 className="text-xl font-bold text-gray-800">
                Request ID: {request.ReqId}
              </h3>
              <p className="text-gray-700">
                <strong>Name:</strong> {request.Name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {request.Email}
              </p>
              <p className="text-gray-700">
                <strong>Product Name:</strong> {request.ProductName}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {request.phone}
              </p>
              <p className="text-gray-700">
                <strong>Requested At:</strong>{" "}
                {new Date(request.Time).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong> {request.Massage || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No product requests found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestProductView;
