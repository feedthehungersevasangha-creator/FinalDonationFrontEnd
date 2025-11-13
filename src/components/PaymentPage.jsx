import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const API_BASE = `${config.API_URL}`; // backend base URL

const INDIA_BOUNDS = {
  latMin: 6.5,
  latMax: 35.5,
  lonMin: 68.0,
  lonMax: 97.5,
};

function isInIndia(lat, lon) {
  return (
    lat >= INDIA_BOUNDS.latMin &&
    lat <= INDIA_BOUNDS.latMax &&
    lon >= INDIA_BOUNDS.lonMin &&
    lon <= INDIA_BOUNDS.lonMax
  );
}

function PaymentPage() {
  const { state: donationData } = useLocation(); // donation info from previous page
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null);
  const [manualLocation, setManualLocation] = useState({ city: "", state: "" });

  useEffect(() => {
    if (!donationData) {
      navigate("/");
      return;
    }
    loadRazorpayScript().then(startPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const getCurrentPosition = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation not supported"));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });

  const createOrderOnBackend = async (amountInRupees, lat, lon, city, state) => {
    const res = await axios.post(`${API_BASE}/payment/create-order`, {
  ...donationData, // full donor object (name, email, etc.)
  amount: donationData.amount,
  location: { lat, lon, city, state },
});

    return res.data;
  };

  const verifyPaymentAndSave = async (payload) => {
    const res = await axios.post(`${API_BASE}/payment/verify`, payload);
    return res.data;
  };

  const startPayment = async () => {
    setStatus("Getting location...");

    let lat = null,
      lon = null,
      city = "",
      state = "";

    try {
      const pos = await getCurrentPosition();
      lat = pos.latitude;
      lon = pos.longitude;
      setCoords({ lat, lon });

      if (!isInIndia(lat, lon)) {
        setStatus("Detected outside India. Payment blocked ❌");
        return;
      }

      setStatus(`Detected location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    } catch {
      setStatus("Could not auto-detect location. Please fill manually.");
    }

    // Fallback manual city/state
    if (!city || !state) {
      if (manualLocation.city && manualLocation.state) {
        city = manualLocation.city;
        state = manualLocation.state;
      } else {
        city = prompt("Enter your city:") || "";
        state = prompt("Enter your state:") || "";
      }
    }

    try {
      setStatus("Creating order on backend...");
      const order = await createOrderOnBackend(
        donationData.amount,
        lat,
        lon,
        city,
        state
      );

      const options = {
        key: order.keyId, // from backend
        amount: order.amount,
        currency: "INR",
        name: "Feed The Hunger Foundation",
        description: "Donation Payment",
        order_id: order.id,
        prefill: {
          name: `${donationData.firstName} ${donationData.lastName}`,
          email: donationData.email,
          contact: donationData.mobile,
        },
        theme: { color: "#3399cc" },
        handler: async function (response) {
  setStatus("Verifying payment...");
  console.log("Razorpay response:", response);

  const verifyPayload = {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
  };

  try {
    const verifyRes = await verifyPaymentAndSave(verifyPayload);

    if (verifyRes && verifyRes.success) {
      setStatus("✅ Payment verified & saved successfully!");
      navigate("/thankyou", {
        state: {
          ...donationData,
          paymentId: response.razorpay_payment_id,
        },
      });
    } else {
      console.warn("Verify returned non-success:", verifyRes);
      setStatus("❌ Payment verification failed!");
      alert(
        "Verification failed: " +
          (verifyRes?.message || "unknown error")
      );
    }
  } catch (err) {
    if (err.response) {
      console.error("Verify error response:", err.response.data);
      setStatus(
        "❌ Verify failed: " +
          (err.response.data.message || JSON.stringify(err.response.data))
      );
    } else {
      console.error("Verify error:", err);
      setStatus("❌ Error verifying payment!");
    }
  }
},

       
        modal: {
          ondismiss: function () {
            setStatus("Payment popup closed ❌");
            navigate("/");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Razorpay Donation (India Only)
        </h2>

        <button
          onClick={startPayment}
          className="bg-button text-white py-2 px-6 rounded-lg hover:bg-yellow-600"
        >
          Donate ₹{donationData?.amount || 500}
        </button>

        <p className="mt-4 text-gray-600 text-sm">{status}</p>

        <div className="mt-4">
          <input
            placeholder="City"
            className="border p-2 rounded mr-2"
            value={manualLocation.city}
            onChange={(e) =>
              setManualLocation({ ...manualLocation, city: e.target.value })
            }
          />
          <input
            placeholder="State"
            className="border p-2 rounded"
            value={manualLocation.state}
            onChange={(e) =>
              setManualLocation({ ...manualLocation, state: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
