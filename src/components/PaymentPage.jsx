// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function PaymentPage() {
//   const { state: donationData } = useLocation();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");


//   useEffect(() => {
//     if (!donationData) {
//       navigate("/");
//       return;
//     }
//     // load Razorpay and get location once
//     loadRazorpayScript();
//   }, []);

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
    

//   const createOrderOnBackend = async (amountInRupees) => {
//     const res = await axios.post(`${API_BASE}/payment/create-order`, {
//       ...donationData,
//       amount: donationData.amount,
//     });
//     return res.data;
//   };

//   const verifyPaymentAndSave = async (payload) => {
//     const res = await axios.post(`${API_BASE}/payment/verify`, payload);
//     return res.data;
//   };

//   const startPayment = async () => {
//     try {
//       setStatus("⏳ Creating order...");
//       const order = await createOrderOnBackend(
//         donationData.amount,
//       );

//       const options = {
//         key: order.keyId,
//         amount: order.amount,
//         currency: "INR",
//         name: "Feed The Hunger Foundation",
//         description: "Donation Payment",
//         order_id: order.id,
//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },
//         theme: { color: "#3399cc" },
//         handler: async function (response) {
//           setStatus("Verifying payment...");
//           const verifyPayload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           };
//           try {
//             const verifyRes = await verifyPaymentAndSave(verifyPayload);
//             if (verifyRes?.success) {
//               setStatus("✅ Payment verified successfully!");
//               navigate("/thankyou", {
//                 state: {
//                   ...donationData,
//                   paymentId: response.razorpay_payment_id,
//                 },
//               });
//             } else {
//               setStatus("❌ Verification failed!");
//             }
//           } catch {
//             setStatus("❌ Error verifying payment.");
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             setStatus("Payment popup closed ❌");
//             navigate("/");
//           },
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] text-center mx-auto">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
//           Razorpay Donation (India Only)
//         </h2>

//         <button
//           onClick={startPayment}
//           className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors duration-200 w-full sm:w-auto"
//         >
//           Donate ₹{donationData?.amount || 500}
//         </button>

//         <p className="mt-4 text-gray-700 text-sm sm:text-base whitespace-pre-line">
//           {status}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const API_BASE = `${config.API_URL}`;

function PaymentPage() {
  const { state: donationData } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");


  useEffect(() => {
    if (!donationData) {
      navigate("/");
      return;
    }
    // load Razorpay and get location once
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
    

  const createOrderOnBackend = async (amountInRupees) => {
    const res = await axios.post(`${API_BASE}/payment/create-order`, {
      ...donationData,
      amount: donationData.amount,
    });
    return res.data;
  };
const createSubscriptionOnBackend = async (donorId, amount) => {
  // ensure integer rupees
  const intAmount = Math.round(Number(amount));
  const res = await axios.post(`${API_BASE}/payment/create-subscription`, {
    donorId,
    amount: intAmount,
  });
  return res.data;
};


  const verifyPaymentAndSave = async (payload) => {
    const res = await axios.post(`${API_BASE}/payment/verify`, payload);
    return res.data;
  };

  const startPayment = async () => {
    try {
      setStatus("⏳ Creating order...");
      const order = await createOrderOnBackend(
        donationData.amount,
      );

      const options = {
        key: order.keyId,
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
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          try {
            const verifyRes = await verifyPaymentAndSave(verifyPayload);
            if (verifyRes?.success) {
              setStatus("✅ Payment verified successfully!");
              navigate("/thankyou", {
                state: {
                  ...donationData,
                  paymentId: response.razorpay_payment_id,
                },
              });
            } else {
              setStatus("❌ Verification failed!");
            }
          } catch {
            setStatus("❌ Error verifying payment.");
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
      setStatus("❌ " + err.message);
    }
  };
  const startSubscription = async () => {
  try {
    setStatus("Creating donor record...");

    const donorRes = await axios.post(`${API_BASE}/payment/create-donor-record`, {
      ...donationData,
    });

    const donorId = donorRes.data.donorId;

    setStatus("Creating subscription...");
const subRes = await createSubscriptionOnBackend(donorId, donationData.amount);
console.log("Subscription Response", subRes);

if (!subRes.success) {
  setStatus("Subscription creation failed");
  return;
}

const options = {
  key: subRes.keyId,
  subscription_id: subRes.subscription_id,
  name: "Feed The Hunger Foundation",
  description: "Monthly Donation Subscription",
  prefill: {
    name: `${donationData.firstName} ${donationData.lastName}`,
    email: donationData.email,
    contact: donationData.mobile,
  },
  handler: function (response) {
    navigate("/thankyou", {
      state: { ...donationData, subscriptionId: subRes.subscription_id },
    });
  },
  theme: { color: "#0d6efd" },
};

//    const subRes = await createSubscriptionOnBackend(donorId, donationData.amount);
//     if (!subRes.data.success) {
//       setStatus("Subscription creation failed");
//       return;
//     }
// const options = {
//   key: subRes.data.keyId,
//   subscription_id: subRes.data.subscription_id,
//   name: "Feed The Hunger Foundation",
//   description: "Monthly Donation Subscription",
//   prefill: {
//     name: `${donationData.firstName} ${donationData.lastName}`,
//     email: donationData.email,
//     contact: donationData.mobile,
//   },
//   handler: function (response) {
//     navigate("/thankyou", {
//       state: { ...donationData, subscriptionId: subRes.data.subscription_id }
//     });
//   },
//   theme: { color: "#0d6efd" },
// };

    // const options = {
    //   key: subRes.data.keyId,
    //   subscription_id: subRes.data.subscription_id,
    //   name: "Feed The Hunger Foundation",
    //   description: "Monthly Donation Subscription",
    //   handler: function () {
    //     navigate("/thankyou", {
    //       state: {
    //         ...donationData,
    //         subscriptionId: subRes.data.subscription_id,
    //       }
    //     });
    //   },
    //   theme: { color: "#0d6efd" },
    // };

    const rz = new window.Razorpay(options);
    rz.open();

  } catch (err) {
    console.error(err);
    setStatus("Subscription error: " + err.message);
  }
};

 const isSubscription =
    donationData.frequency === "monthly" &&
    donationData.paymentMode === "E-Mandate"||
     donationData.paymentMode === "UPI";

  const isOneTime =
    donationData.frequency === "onetime" 
   ;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] text-center mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
          Razorpay Donation (India Only)
        </h2>
{/* NORMAL PAYMENT */}
<button
  onClick={startPayment}
  className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors w-full sm:w-auto"
>
  Pay Once ₹{donationData?.amount}
</button>

{/* MONTHLY E-MANDATE / SUBSCRIPTION */}
{donationData.frequency === "monthly" && (
  <button
    onClick={startSubscription}
    className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto mt-3"
  >
    Setup Monthly e-Mandate ₹{donationData?.amount}
  </button>
)}

        {/* <button
          onClick={startPayment}
          className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors duration-200 w-full sm:w-auto"
        >
          Donate ₹{donationData?.amount || 500}
        </button> */}

        <p className="mt-4 text-gray-700 text-sm sm:text-base whitespace-pre-line">
          {status}
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;


