
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import config from "../config";

// // const API_BASE = `${config.API_URL}`;

// // function PaymentPage() {
// //   const { state: donationData } = useLocation();
// //   const navigate = useNavigate();
// //   const [status, setStatus] = useState("");


// //   useEffect(() => {
// //     if (!donationData) {
// //       navigate("/");
// //       return;
// //     }
// //     // load Razorpay 
// //     loadRazorpayScript();
// //   }, []);

// //   const loadRazorpayScript = () =>
// //     new Promise((resolve) => {
// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
    
// //  // ONE-TIME ORDER
// //   const createOrderOnBackend = async (amountInRupees) => {
// //     const res = await axios.post(`${API_BASE}/payment/create-order`, {
// //       ...donationData,
// //       amount: donationData.amount,
// //     });
// //     return res.data;
// //   };
// //      // SUBSCRIPTION 
// // const createSubscriptionOnBackend = async (donorId, amount) => {
// //   const intAmount = Math.round(Number(amount));
// //   const res = await axios.post(`${API_BASE}/payment/create-subscription`, {
// //     donorId,
// //     amount: intAmount,
// //   });
// //   return res.data;
// // };
// //   const verifyPaymentAndSave = async (payload) => {
// //     const res = await axios.post(`${API_BASE}/payment/verify`, payload);
// //     return res.data;
// //   };
// //   // ONE-TIME PAYMENT FLOW
// //   const startPayment = async () => {
// //     try {
// //       setStatus("⏳ Creating order...");
// //       const order = await createOrderOnBackend(
// //         donationData.amount,
// //       );
// //       const options = {
// //         key: order.keyId,
// //         amount: order.amount,
// //         currency: "INR",
// //         name: "Feed The Hunger Foundation",
// //         description: "Donation Payment",
// //         order_id: order.id,
// //         prefill: {
// //           name: `${donationData.firstName} ${donationData.lastName}`,
// //           email: donationData.email,
// //           contact: donationData.mobile,
// //         },
// //         theme: { color: "#3399cc" },
// //         handler: async function (response) {
// //           setStatus("Verifying payment...");
// //           const verifyPayload = {
// //             razorpay_order_id: response.razorpay_order_id,
// //             razorpay_payment_id: response.razorpay_payment_id,
// //             razorpay_signature: response.razorpay_signature,
// //           };
// //           try {
// //             const verifyRes = await verifyPaymentAndSave(verifyPayload);
// //             if (verifyRes?.success) {
// //               setStatus("✅ Payment verified successfully!");
// //               navigate("/thankyou", {
// //                 state: {
// //                   ...donationData,
// //                   paymentId: response.razorpay_payment_id,
// //                 },
// //               });
// //             } else {
// //               setStatus("❌ Verification failed!");
// //             }
// //           } catch {
// //             setStatus("❌ Error verifying payment.");
// //           }
// //         },
// //         modal: {
// //           ondismiss: function () {
// //             setStatus("Payment popup closed ❌");
// //             navigate("/");
// //           },
// //         },
// //       };
// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (err) {
// //       console.error(err);
// //       setStatus("❌ " + err.message);
// //     }
// //   };
// //       // SUBSCRIPTION PAYMENT FLOW (MANDATE)
// //   const startSubscription = async () => {
// //   try {
// //     setStatus("Creating donor record...");

// //     const donorRes = await axios.post(`${API_BASE}/payment/create-donor-record`, {
// //       ...donationData,
// //     });

// //     const donorId = donorRes.data.donorId;

// //     setStatus("Creating subscription...");
// // const subRes = await createSubscriptionOnBackend(donorId, donationData.amount);
// // console.log("Subscription Response", subRes);

// // if (!subRes.success) {
// //   setStatus("Subscription creation failed");
// //   return;
// // }

// // const options = {
// //   key: subRes.keyId,
// //   subscription_id: subRes.subscription_id,
// //   name: "Feed The Hunger Foundation",
// //   description: "Monthly Donation Subscription",
// //   prefill: {
// //     name: `${donationData.firstName} ${donationData.lastName}`,
// //     email: donationData.email,
// //     contact: donationData.mobile,
// //   },
// //   handler: function (response) {
// //     navigate("/thankyou", {
// //       state: { ...donationData, subscriptionId: subRes.subscription_id },
// //     });
// //   },
// //   theme: { color: "#0d6efd" },
// // };
  
// //     const rz = new window.Razorpay(options);
// //     rz.open();

// //   } catch (err) {
// //     console.error(err);
// //     setStatus("Subscription error: " + err.message);
// //   }
// // };

// //  // const isSubscription =
// //  //    donationData.frequency === "monthly" &&
// //  //    donationData.paymentMode === "E-Mandate"||
// //  //     donationData.paymentMode === "UPI";

// //  //  const isOneTime =
// //  //    donationData.frequency === "onetime" 
// //  //   ;


// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
// //       <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] text-center mx-auto">
// //         <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
// //           Razorpay Donation (India Only)
// //         </h2>
// // {/* NORMAL PAYMENT */}
// // <button
// //   onClick={startPayment}
// //   className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors w-full sm:w-auto"
// // >
// //   Pay Once ₹{donationData?.amount}
// // </button>

// // {/* MONTHLY E-MANDATE / SUBSCRIPTION */}
// // {donationData.frequency === "monthly" && (
// //   <button
// //     onClick={startSubscription}
// //     className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto mt-3"
// //   >
// //     Setup Monthly e-Mandate ₹{donationData?.amount}
// //   </button>
// // )}

// //         {/* <button
// //           onClick={startPayment}
// //           className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors duration-200 w-full sm:w-auto"
// //         >
// //           Donate ₹{donationData?.amount || 500}
// //         </button> */}

// //         <p className="mt-4 text-gray-700 text-sm sm:text-base whitespace-pre-line">
// //           {status}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PaymentPage;
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
// // const createSubscriptionOnBackend = async (donorId, amount) => {
// //   // ensure integer rupees
// //   const intAmount = Math.round(Number(amount));
// //   const res = await axios.post(`${API_BASE}/payment/create-subscription`, {
// //     donorId,
// //     amount: intAmount,
// //   });
// //   return res.data;
// // };
// const createSubscriptionOnBackend = async (donorId, amount, starterAmount) => {
//   const res = await axios.post(`${API_BASE}/payment/create-subscription`, {
//     donorId,
//     amount: Number(amount),
//     starterAmount: Number(starterAmount) || 10,  // ⚡ send 5/10/15
//   });
//   return res.data;
// };


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
//         name: "Feed The Hunger Seva Sangha Foundation",
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
// donorId: order.donorId
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
// //   const startSubscription = async () => {
// //   try {
// //     setStatus("Creating donor record...");

// //     const donorRes = await axios.post(`${API_BASE}/payment/create-donor-record`, {
// //       ...donationData,
// //     });

// //     const donorId = donorRes.data.donorId;

// //     setStatus("Creating subscription...");

// //    const subRes = await createSubscriptionOnBackend(donorId, donationData.amount);
// //     if (!subRes.success) {
// //       setStatus("Subscription creation failed");
// //       return;
// //     }
// // const options = {
// //   key: subRes.keyId,
// //   subscription_id: subRes.subscription_id,
// //   name: "Feed The Hunger Seva Sangha Foundation",
// //   description: "Monthly Donation Subscription",
// //   prefill: {
// //     name: `${donationData.firstName} ${donationData.lastName}`,
// //     email: donationData.email,
// //     contact: donationData.mobile,
// //   },
// //   handler: function (response) {
// //     navigate("/thankyou", {
// //       state: { ...donationData, subscriptionId: subRes.subscription_id ,  donorId: donorId               
// // }
// //     });
// //   },
// //   theme: { color: "#0d6efd" },
// // };

//     // const options = {
//     //   key: subRes.data.keyId,
//     //   subscription_id: subRes.data.subscription_id,
//     //   name: "Feed The Hunger Foundation",
//     //   description: "Monthly Donation Subscription",
//     //   handler: function () {
//     //     navigate("/thankyou", {
//     //       state: {
//     //         ...donationData,
//     //         subscriptionId: subRes.data.subscription_id,
//     //       }
//     //     });
//     //   },
//     //   theme: { color: "#0d6efd" },
//     // };

// //     const rz = new window.Razorpay(options);
// //     rz.open();

// //   } catch (err) {
// //     console.error(err);
// //     setStatus("Subscription error: " + err.message);
// //   }
// // };
// const startSubscription = async () => {
//   try {
//     setStatus("🟡 Creating donor record...");

//     // 1️⃣ Create donor record in backend
//     const donorRes = await axios.post(`${API_BASE}/payment/create-donor-record`, {
//       ...donationData,
//     });

//     const donorId = donorRes.data.donorId;
//     console.log("🟢 Donor created:", donorId);

//     setStatus("🟡 Creating E-Mandate");

//     // 2️⃣ Create subscription (MANDATE) in backend
//     const subRes = await axios.post(`${API_BASE}/payment/create-subscription`, {
//       donorId,
//       amount: Number(donationData.amount),
//       starterAmount: donationData.starterAmount || 10, // 5/10/15 first debit
//     });

//     console.log(" Subscription API response:", subRes.data);

//     if (!subRes.data.success) {
//       setStatus("❌ Failed to create E-Mandate");
//       return;
//     }

//     const subscriptionId = subRes.data.subscription_id;

//     // 3️⃣ Razorpay Checkout for E-mandate
//     const options = {
//       key: subRes.data.keyId,
//       subscription_id: subscriptionId,
//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation Subscription",
//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       handler: async function (response) {
//         console.log(" Razorpay Subscription Response:", response);

//         // 4️⃣ VERIFY subscription signature
//         const verifyRes = await axios.post(`${API_BASE}/payment/verify-subscription`, {
//           razorpay_subscription_id: response.razorpay_subscription_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         });

//         if (!verifyRes.data.success) {
//           setStatus("❌ E-Mandate verification failed!");
//           return;
//         }

//         setStatus("🟢 E-Mandate Activated Successfully!");

//         // 5️⃣ Navigate
//         navigate("/thankyou", {
//           state: {
//             ...donationData,
//             subscriptionId: subscriptionId,
//             donorId: donorId,
//           },
//         });
//       },

//       modal: {
//         ondismiss: function () {
//           setStatus("❌ E-Mandate setup cancelled");
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     console.log(" Opening Razorpay Subscription Checkout:", options);

//     const rz = new window.Razorpay(options);
//     rz.open();

//   } catch (err) {
//     console.error("❌ Subscription error:", err);
//     setStatus("Subscription error: " + err.message);
//   }
// };

//  // const isSubscription =
//  //    donationData.frequency === "monthly" &&
//  //    donationData.paymentMode === "E-Mandate"||
//  //     donationData.paymentMode === "UPI";
// const isSubscription =
//   donationData.frequency === "monthly" &&
//   (donationData.paymentMode === "E-Mandate" || donationData.paymentMode === "UPI");

//   const isOneTime =
//     donationData.frequency === "onetime" 
//    ;


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] text-center mx-auto">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
//           Razorpay Donation (India Only)
//         </h2>
// {/* NORMAL PAYMENT */}
// {donationData.frequency === "onetime" && (
// <button
//   onClick={startPayment}
//   className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors w-full sm:w-auto"
// >
//   Pay Once ₹{donationData?.amount}
// </button>
//     )}

// {/* MONTHLY E-MANDATE / SUBSCRIPTION */}
// {donationData.frequency === "monthly" && (
//   <button
//     onClick={startSubscription}
//     className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto mt-3"
//   >
//     Setup Monthly e-Mandate ₹{donationData?.amount}
//   </button>
// )}

//         {/* <button
//           onClick={startPayment}
//           className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 transition-colors duration-200 w-full sm:w-auto"
//         >
//           Donate ₹{donationData?.amount || 500}
//         </button> */}

//         <p className="mt-4 text-gray-700 text-sm sm:text-base whitespace-pre-line">
//           {status}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function PaymentPage() {
//   const { state: donationData } = useLocation();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");

//   // ---------------- Razorpay Debug Listener ----------------
//   useEffect(() => {
//     const logListener = (e) => {
//       console.log("📢 RAZORPAY DEBUG:", e.detail);
//     };
//     window.addEventListener("rzp-log", logListener);

//     return () => window.removeEventListener("rzp-log", logListener);
//   }, []);

//   // ---------------- Razorpay Script Loader ----------------
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       // Prevent double-loading script
//       if (window.Razorpay) return resolve(true);

//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   useEffect(() => {
//     if (!donationData) {
//       navigate("/");
//       return;
//     }
//     loadRazorpayScript();
//   }, []);

//   // ---------------- API CALLS ----------------

//   const createOrderOnBackend = async () => {
//     const res = await axios.post(`${API_BASE}/payment/create-order`, {
//       ...donationData,
//       amount: donationData.amount,
//     });
//     return res.data;
//   };

//   const createSubscriptionOnBackend = async (donorId, amount, starterAmount) => {
//     const res = await axios.post(`${API_BASE}/payment/create-subscription`, {
//       donorId,
//       amount: Number(amount),
//       starterAmount: Number(starterAmount) || 10,
//     });

//     return res.data;
//   };

//   const verifyPaymentAndSave = async (payload) => {
//     const res = await axios.post(`${API_BASE}/payment/verify`, payload);
//     return res.data;
//   };

//   // --------------------------------------------------------------------
//   // ONE-TIME PAYMENT
//   // --------------------------------------------------------------------

//   const startPayment = async () => {
//     try {
//       setStatus("⏳ Creating order...");

//       const order = await createOrderOnBackend();

//       const options = {
//         key: order.keyId,
//         amount: order.amount,
//         currency: "INR",
//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Donation Payment",
//         order_id: order.id,
//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           // Emit debug event
//           window.dispatchEvent(
//             new CustomEvent("rzp-log", {
//               detail: { event: "payment_success", response },
//             })
//           );

//           setStatus("Verifying payment...");

//           const verifyPayload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           const verifyRes = await verifyPaymentAndSave(verifyPayload);

//           if (verifyRes?.success) {
//             setStatus("✅ Payment verified!");
//             navigate("/thankyou", {
//               state: {
//                 ...donationData,
//                 paymentId: response.razorpay_payment_id,
//                 donorId: order.donorId,
//               },
//             });
//           } else {
//             setStatus("❌ Verification failed");
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             window.dispatchEvent(
//               new CustomEvent("rzp-log", {
//                 detail: { event: "payment_cancelled" },
//               })
//             );

//             setStatus("Payment popup closed ❌");
//             navigate("/");
//           },
//         },

//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ " + err.message);
//     }
//   };

//   // --------------------------------------------------------------------
//   // SUBSCRIPTION / E-MANDATE
//   // --------------------------------------------------------------------

//   const startSubscription = async () => {
//     try {
//       setStatus("🟡 Creating donor record...");

//       // Create donor
//       const donorRes = await axios.post(`${API_BASE}/payment/create-donor-record`, {
//         ...donationData,
//       });

//       const donorId = donorRes.data.donorId;

//       window.dispatchEvent(
//         new CustomEvent("rzp-log", {
//           detail: { event: "donor_created", donorId },
//         })
//       );

//       setStatus("🟡 Creating E-Mandate...");

//       // Create subscription on backend
//       const subRes = await createSubscriptionOnBackend(
//         donorId,
//         donationData.amount,
//         donationData.starterAmount || 10
//       );

//       if (!subRes.success) {
//         setStatus("❌ Subscription creation failed");
//         return;
//       }

//       const subscriptionId = subRes.subscription_id;

//       // Razorpay Checkout for Autopay
//       const options = {
//         key: subRes.keyId,
//         subscription_id: subscriptionId,
//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Monthly Donation Subscription",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           window.dispatchEvent(
//             new CustomEvent("rzp-log", {
//               detail: { event: "subscription_completed", response },
//             })
//           );

//           // Verify subscription
//           const verifyRes = await axios.post(`${API_BASE}/payment/verify-subscription`, {
//             razorpay_subscription_id: response.razorpay_subscription_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (!verifyRes.data.success) {
//             setStatus("❌ E-Mandate verification failed!");
//             return;
//           }

//           setStatus("🟢 E-Mandate Activated!");

//           navigate("/thankyou", {
//             state: {
//               ...donationData,
//               subscriptionId,
//               donorId,
//             },
//           });
//         },

//         modal: {
//           ondismiss: function () {
//             window.dispatchEvent(
//               new CustomEvent("rzp-log", {
//                 detail: { event: "subscription_cancelled" },
//               })
//             );

//             setStatus("❌ E-Mandate setup cancelled");
//           },
//         },

//         theme: { color: "#0d6efd" },
//       };

//       window.dispatchEvent(
//         new CustomEvent("rzp-log", {
//           detail: { event: "opening_checkout", options },
//         })
//       );

//       const rz = new window.Razorpay(options);
//       rz.open();
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ Subscription error: " + err.message);
//     }
//   };

//   // --------------------------------------------------------------------
//   // UI RENDER
//   // --------------------------------------------------------------------

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-[480px] text-center">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Razorpay Donation (India Only)
//         </h2>

//         {/* ONE-TIME PAYMENT */}
//         {donationData.frequency === "onetime" && (
//           <button
//             onClick={startPayment}
//             className="bg-yellow-500 text-white py-2 px-8 rounded-lg hover:bg-yellow-600 w-full"
//           >
//             Pay Once ₹{donationData.amount}
//           </button>
//         )}

//         {/* MONTHLY SUBSCRIPTION */}
//         {donationData.frequency === "monthly" && (
//           <button
//             onClick={startSubscription}
//             className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 w-full mt-3"
//           >
//             Setup Monthly e-Mandate ₹{donationData.amount}
//           </button>
//         )}

//         <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">
//           {status}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;


//-----------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function PaymentPage() {
//   const { state: donationData } = useLocation();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");

//   // Log Razorpay events
//   useEffect(() => {
//     const listener = (e) => console.log("📢 RZP:", e.detail);
//     window.addEventListener("rzp-log", listener);
//     return () => window.removeEventListener("rzp-log", listener);
//   }, []);

//   // Load Razorpay script once
//   useEffect(() => {
//     if (!donationData) {
//       navigate("/");
//       return;
//     }

//     if (!window.Razorpay) {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => console.log("Razorpay loaded");
//       document.body.appendChild(script);
//     }
//   }, []);

//   // ------------------ API Calls -------------------
//   const createOrderOnBackend = async () =>
//     (await axios.post(`${API_BASE}/payment/create-order`, donationData)).data;

//   const createDonor = async () =>
//     (await axios.post(`${API_BASE}/payment/create-donor-record`, donationData))
//       .data;

//   const createSubscription = async (donorId) =>
//     (
//       await axios.post(`${API_BASE}/payment/create-subscription`, {
//         donorId,
//         amount: Number(donationData.amount),
//         starterAmount: donationData.starterAmount || 10,
//       })
//     ).data;

//   const verifyOrderPayment = async (payload) =>
//     (await axios.post(`${API_BASE}/payment/verify`, payload)).data;

//   const verifySubscriptionPayment = async (payload) =>
//     (
//       await axios.post(`${API_BASE}/payment/verify-subscription`, payload)
//     ).data;

//   // --------------------------------------------------------------
//   // ONE TIME PAYMENT
//   // --------------------------------------------------------------
//   const startPayment = async () => {
//     try {
//       setStatus("Creating order...");
//       const order = await createOrderOnBackend();

//       const options = {
//         key: order.keyId,
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,

//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Donation Payment",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           console.log("🟢 ORDER PAYMENT RESPONSE:", response);

//           const verifyRes = await verifyOrderPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (verifyRes.success) {
//             setStatus("Payment successful!");
//             navigate("/thankyou", {
//               state: {
//                 ...donationData,
//                 paymentId: response.razorpay_payment_id,
//               },
//             });
//           } else {
//             setStatus("Verification failed!");
//           }
//         },

//         modal: {
//           ondismiss: () => setStatus("Payment closed ❌"),
//         },

//         theme: { color: "#0d6efd" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       setStatus("Error: " + err.message);
//     }
//   };

//   // --------------------------------------------------------------
//   // SUBSCRIPTION / MANDATE
//   // --------------------------------------------------------------
//   const startSubscription = async () => {
//     try {
//       setStatus("Creating donor...");
//       const donor = await createDonor();
//       const donorId = donor.donorId;

//       setStatus("Creating subscription...");
//       const subRes = await createSubscription(donorId);

//       if (!subRes.success) {
//         setStatus("Subscription creation failed");
//         return;
//       }

//       const subscriptionId = subRes.subscription_id;

//       const options = {
//         key: subRes.keyId,
//         subscription_id: subscriptionId,

//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Monthly Donation Subscription",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           console.log("🟢 SUBSCRIPTION RESPONSE:", response);

//           // Razorpay UPI AutoPay sometimes does NOT return payment_id
//           const verifyPayload = {
//             razorpay_subscription_id: response.razorpay_subscription_id,
//             razorpay_signature: response.razorpay_signature,
//             razorpay_payment_id: response.razorpay_payment_id || null,
//           };

//           console.log("📤 VERIFY PAYLOAD:", verifyPayload);

//           const verifyRes = await verifySubscriptionPayment(verifyPayload);

//           // if (!verifyRes.success) {
//           //   setStatus("Verification failed (check backend)");
//           //   console.log("⚠️ BACKEND VERIFY FAILED:", verifyRes);
//           //   return;
//           // }

//           setStatus("Subscription activated!");
// navigate("/thankyou", {
//         state: {
//             ...donationData,
//             status: "success",
//             subscriptionId,
//             donorId
//         }
//     });
//           // navigate("/thankyou", {
//           //   state: { ...donationData, subscriptionId, donorId },
//           // });
//         },

//         modal: {
//           ondismiss: () => setStatus("Mandate cancelled ❌"),
//         },

//         theme: { color: "#0d6efd" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       setStatus("Error: " + err.message);
//     }
//   };

//   // --------------------------------------------------------------
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
//         <h2 className="text-xl font-bold mb-4">Razorpay Donation (India Only)</h2>

//         {donationData.frequency === "onetime" && (
//           <button
//             onClick={startPayment}
//             className="bg-yellow-600 text-white px-6 py-3 rounded-lg w-full"
//           >
//             Pay Once ₹{donationData.amount}
//           </button>
//         )}

//         {donationData.frequency === "monthly" && (
//           <button
//             onClick={startSubscription}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
//           >
//             Setup Monthly e-Mandate ₹{donationData.amount}
//           </button>
//         )}

//         <p className="mt-4 text-gray-700 text-sm">{status}</p>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;
// ------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function PaymentPage() {
//   const { state: donationData } = useLocation();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");

//   // Log Razorpay events (debug)
//   useEffect(() => {
//     const listener = (e) => console.log("📢 RZP:", e.detail);
//     window.addEventListener("rzp-log", listener);
//     return () => window.removeEventListener("rzp-log", listener);
//   }, []);

//   // Load Razorpay script once
//   useEffect(() => {
//     if (!donationData) {
//       navigate("/");
//       return;
//     }

//     if (!window.Razorpay) {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => console.log("Razorpay loaded");
//       document.body.appendChild(script);
//     }
//   }, [donationData, navigate]);

//   // ------------------ API Calls -------------------
//   const createOrderOnBackend = async () =>
//     (await axios.post(`${API_BASE}/payment/create-order`, donationData)).data;

//   const createDonor = async () =>
//     (await axios.post(`${API_BASE}/payment/create-donor-record`, donationData))
//       .data;

//   const createSubscription = async (donorId) =>
//     (
//       await axios.post(`${API_BASE}/payment/create-subscription`, {
//         donorId,
//         amount: Number(donationData.amount),
//         starterAmount: donationData.starterAmount || 10,
//       })
//     ).data;

//   const verifyOrderPayment = async (payload) =>
//     (await axios.post(`${API_BASE}/payment/verify`, payload)).data;

//   const verifySubscriptionPayment = async (payload) =>
//     (
//       await axios.post(`${API_BASE}/payment/verify-subscription`, payload)
//     ).data;

//   // --------------------------------------------------------------
//   // ONE TIME PAYMENT
//   // --------------------------------------------------------------
//   const startPayment = async () => {
//     try {
//       setStatus("Creating order...");
//       const order = await createOrderOnBackend();
//       console.log("Created order from backend:", order);

//       const options = {
//         key: order.keyId,
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,

//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Donation Payment",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           console.log("🟢 ORDER PAYMENT RESPONSE:", response);

//           const verifyRes = await verifyOrderPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           console.log("VERIFY ORDER RESULT:", verifyRes);

//           if (verifyRes.success) {
//             setStatus("Payment successful!");
//             navigate("/thankyou", {
//               state: {
//                 ...donationData,
//                 paymentId: response.razorpay_payment_id,
//                 status: "success",
//               },
//             });
//           } else {
//             setStatus("Verification failed!");
//           }
//         },

//         modal: {
//           ondismiss: () => setStatus("Payment closed ❌"),
//         },

//         theme: { color: "#0d6efd" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       setStatus("Error: " + err.message);
//     }
//   };

//   // --------------------------------------------------------------
//   // SUBSCRIPTION / MANDATE  (CARD / NETBANKING)
//   // --------------------------------------------------------------
//   const startSubscription = async () => {
//     try {
//       setStatus("Creating donor...");
//       const donor = await createDonor();
//       const donorId = donor.donorId;
//       console.log("Created donor:", donor);

//       setStatus("Creating subscription...");
//       const subRes = await createSubscription(donorId);
//       console.log("Created subscription:", subRes);

//       if (!subRes.success) {
//         setStatus("Subscription creation failed");
//         return;
//       }

//       const subscriptionId = subRes.subscription_id;

//       const options = {
//         key: subRes.keyId,
//         subscription_id: subscriptionId,

//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Monthly Donation Subscription",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//           console.log("🟢 SUBSCRIPTION RESPONSE:", response);

//           // For card/netbanking subscription, payment_id MUST be present
//           const verifyPayload = {
//             razorpay_subscription_id: response.razorpay_subscription_id,
//             razorpay_signature: response.razorpay_signature,
//             razorpay_payment_id: response.razorpay_payment_id,
//           };

//           console.log("📤 VERIFY PAYLOAD (SUBSCRIPTION):", verifyPayload);

//           const verifyRes = await verifySubscriptionPayment(verifyPayload);
//           console.log("VERIFY SUBSCRIPTION RESULT:", verifyRes);

//           if (!verifyRes.success) {
//             setStatus("Verification failed (check backend logs)");
//             return;
//           }

//           setStatus("Subscription activated!");
//           navigate("/thankyou", {
//             state: {
//               ...donationData,
//               status: "success",
//               subscriptionId,
//               donorId,
//             },
//           });
//         },

//         modal: {
//           ondismiss: () => setStatus("Mandate cancelled ❌"),
//         },

//         theme: { color: "#0d6efd" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       setStatus("Error: " + err.message);
//     }
//   };

//   // --------------------------------------------------------------
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
//         <h2 className="text-xl font-bold mb-4">
//           Razorpay Donation (India Only)
//         </h2>

//         {donationData?.frequency === "onetime" && (
//           <button
//             onClick={startPayment}
//             className="bg-yellow-600 text-white px-6 py-3 rounded-lg w-full"
//           >
//             Pay Once ₹{donationData.amount}
//           </button>
//         )}

//         {donationData?.frequency === "monthly" && (
//           <button
//             onClick={startSubscription}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
//           >
//             Setup Monthly e-Mandate ₹{donationData.amount}
//           </button>
//         )}

//         <p className="mt-4 text-gray-700 text-sm">{status}</p>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;


// ----------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const API_BASE = `${config.API_URL}`;
// const PAYMENT_TIMEOUT = 600; // 10 minutes (in seconds)
const PAYMENT_TIMEOUT = 180; // 3 minutes (in seconds)

function PaymentPage() {
  const { state: donationData } = useLocation();
  const navigate = useNavigate();
const PAYMENT_TIMEOUT = 180; // seconds
const EXPIRY_KEY = "paymentExpiryTime";
  const [status, setStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIMEOUT);
  const [expired, setExpired] = useState(false);

  // --------------------------------------------------
  // 🛑 BLOCK INVALID ENTRY / DOUBLE PAYMENT
  // --------------------------------------------------
  
    useEffect(() => {
  if (!donationData) {
    navigate("/");
    return;
  }

  // ✅ Set expiry time only once
  if (!sessionStorage.getItem(EXPIRY_KEY)) {
    const expiryTime = Date.now() + PAYMENT_TIMEOUT * 1000;
    sessionStorage.setItem(EXPIRY_KEY, expiryTime.toString());
  }
}, [donationData, navigate]);

  // --------------------------------------------------
  // ⏱ 10-MINUTE PAYMENT TIMER
  // --------------------------------------------------
    useEffect(() => {
  const interval = setInterval(() => {
    const expiry = Number(sessionStorage.getItem(EXPIRY_KEY));
    if (!expiry) return;

    const remaining = Math.max(
      Math.floor((expiry - Date.now()) / 1000),
      0
    );

    setTimeLeft(remaining);

    if (remaining === 0) {
      setExpired(true);
      setStatus("Session expired. Please try again.");

      sessionStorage.removeItem("paymentStarted");
      sessionStorage.removeItem(EXPIRY_KEY);

      clearInterval(interval);
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);


  // --------------------------------------------------
  // 🔧 Load Razorpay Script
  // --------------------------------------------------
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("✅ Razorpay loaded");
      document.body.appendChild(script);
    }
  }, []);
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  // --------------------------------------------------
  // API CALLS
  // --------------------------------------------------
  const createOrderOnBackend = async () =>
    (await axios.post(`${API_BASE}/payment/create-order`, donationData)).data;

  const createDonor = async () =>
    (await axios.post(`${API_BASE}/payment/create-donor-record`, donationData))
      .data;
  const createSubscription = async (donorId) =>
    (
      await axios.post(`${API_BASE}/payment/create-subscription`, {
        donorId,
        amount: Number(donationData.amount),
        starterAmount: donationData.starterAmount || 10,
      })
    ).data;
  const verifyOrderPayment = async (payload) =>
    (await axios.post(`${API_BASE}/payment/verify`, payload)).data;

  const verifySubscriptionPayment = async (payload) =>
    (
      await axios.post(`${API_BASE}/payment/verify-subscription`, payload)
    ).data;

  // --------------------------------------------------
  // 🟡 ONE-TIME PAYMENT latest
  // --------------------------------------------------
  // const startPayment = async () => {
  //   if (expired) return;

  //   try {
  //     setStatus("Creating order...");
  //     const order = await createOrderOnBackend();

  //     const options = {
  //       key: order.keyId,
  //       amount: order.amount,
  //       currency: "INR",
  //       order_id: order.id,

  //       name: "Feed The Hunger Seva Sangha Foundation",
  //       description: "Donation Payment",

  //       prefill: {
  //         name: `${donationData.firstName} ${donationData.lastName}`,
  //         email: donationData.email,
  //         contact: donationData.mobile,
  //       },

  //       handler: async (response) => {
  //         setStatus("Verifying payment...");

  //         const verifyRes = await verifyOrderPayment({
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //         });

  //         if (verifyRes.success) {
  //           console.log("✅ Navigating to ThankYou with donorId:", verifyRes.donorId);
  //           sessionStorage.removeItem("paymentStarted");
  //              navigate("/thankyou", {
  //     replace: true,
  //     state: {
  //       frequency: "onetime",
  //       amount: donationData.amount,
  //       paymentId: response.razorpay_payment_id,
  //       donorId: verifyRes.donorId,
  //     },
  //   });
  //         } else {
  //           setStatus("Payment verification failed.");
  //         }
  //       },

  //       modal: {
  //         ondismiss: () => setStatus("Payment cancelled ❌"),
  //       },

  //       theme: { color: "#0d6efd" },
  //     };

  //     new window.Razorpay(options).open();
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Error occurred. Try again.");
  //   }
  // };
// ------------------------------------------------------
    const startPayment = async () => {
  if (expired) return;
  sessionStorage.setItem("paymentStarted", "true");
  try {
    setStatus("Creating order...");
    const order = await createOrderOnBackend();

    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      name: "Feed The Hunger Seva Sangha Foundation",
      description: "Donation Payment",

      prefill: {
        name: `${donationData.firstName} ${donationData.lastName}`,
        email: donationData.email,
        contact: donationData.mobile,
      },

      // ✅ SUCCESS
      handler: async (response) => {
        setStatus("Verifying payment...");

        const verifyRes = await verifyOrderPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        sessionStorage.removeItem("paymentStarted");
            sessionStorage.removeItem(EXPIRY_KEY);

        if (verifyRes.success) {
          navigate("/thankyou", {
            replace: true,
            state: {
              uiStatus: "SUCCESS",
              frequency: "onetime",
              amount: donationData.amount,
              donorId: verifyRes.donorId,
              paymentId: response.razorpay_payment_id,
            },
          });
        } else {
          navigate("/thankyou", {
            replace: true,
            state: {
              uiStatus: "FAILED",
              frequency: "onetime",
              amount: donationData.amount,
            },
          });
        }
      },

      // ❌ USER CLOSED WINDOW
      modal: {
        ondismiss: () => {
          sessionStorage.removeItem("paymentStarted");
  sessionStorage.removeItem(EXPIRY_KEY);
          navigate("/thankyou", {
            replace: true,
            state: {
              uiStatus: "CANCELLED",
              frequency: "onetime",
              amount: donationData.amount,
            },
          });
        },
      },

      theme: { color: "#0d6efd" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error(err);
    setStatus("Error occurred. Try again.");
    sessionStorage.removeItem("paymentStarted");
    sessionStorage.removeItem(EXPIRY_KEY);
  }
};

  // --------------------------------------------------
  // 🔵 SUBSCRIPTION / e-MANDATE
  // --------------------------------------------------
//   const startSubscription = async () => {
//     if (expired) return;

//     try {
//       setStatus("Creating donor...");
//       const donor = await createDonor();
// console.log("✅ Donor created:", donor);
//       setStatus("Creating subscription...");
//       const subRes = await createSubscription(donor.donorId);
// console.log("✅ Subscription response:", subRes);

//       if (!subRes.success) {
//         setStatus("Subscription creation failed");
//         return;
//       }

//       const options = {
//         key: subRes.keyId,
//         subscription_id: subRes.subscription_id,

//         name: "Feed The Hunger Seva Sangha Foundation",
//         description: "Monthly Donation (e-Mandate)",

//         prefill: {
//           name: `${donationData.firstName} ${donationData.lastName}`,
//           email: donationData.email,
//           contact: donationData.mobile,
//         },

//         handler: async (response) => {
//               console.log("✅ Razorpay mandate response:", response);
//           setStatus("Verifying mandate...");

//           const verifyRes = await verifySubscriptionPayment({
//             razorpay_subscription_id: response.razorpay_subscription_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });
// console.log("📤 Mandate verify payload:", payload);


//   console.log("📥 Mandate verify response:", verifyRes);
//           if (verifyRes.success) {
//               console.log("✅ Navigating to ThankYou with donorId:", donor.donorId);

//     sessionStorage.removeItem("paymentStarted");
//             sessionStorage.removeItem("paymentStarted");
//             navigate(`/thankyou/${donor.donorId}`, {
//               state: {
//         amount: donationData.amount,
//         subscriptionId: response.razorpay_subscription_id,
//         frequency: "monthly",
//       },
//             });
//           } else {
//             setStatus("Subscription verification failed.");
//           }
//         },

//         modal: {
//           ondismiss: () => setStatus("Mandate cancelled ❌"),
//         },

//         theme: { color: "#0d6efd" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       setStatus("Error occurred. Try again.");
//     }
//   };
//     const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donor = await createDonor();
//     console.log("✅ Donor created:", donor);

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donor.donorId);
//     console.log("✅ Subscription created:", subRes);

//     if (!subRes.success) {
//       setStatus("Subscription creation failed");
//       return;
//     }

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },
//         handler: () => {
//   console.log("✅ Razorpay mandate initiated");

//   sessionStorage.removeItem("paymentStarted");

//   navigate(`/thankyou/${donor.donorId}`, {
//     replace: true,
//     state: {
//       donorId: donor.donorId,
//       amount: donationData.amount,
//       frequency: "monthly",
//       subscriptionId: subRes.subscription_id,
//       info:
//         "Your mandate request has been submitted. Receipt will be available after confirmation.",
//     },
//   });
// },


// //       handler: (response) => {
// //         console.log("✅ Razorpay mandate initiated:", response);

// //         // ✅ DO NOT VERIFY HERE
// //         // ✅ Webhook will update mandate status

// //         sessionStorage.removeItem("paymentStarted");

// //     navigate(`/thankyou/${donor.donorId}`, {
// //   state: {
// //     donorId: donor.donorId,
// //     amount: donationData.amount,
// //     frequency: "monthly",
// //     subscriptionId: response.razorpay_subscription_id,
// //     info:
// //       "Your mandate request has been submitted. Receipt will be available after confirmation.",
// //   },
// // });
// //       },

//       modal: {
//         ondismiss: () => setStatus("Mandate setup cancelled ❌"),
//       },

//       theme: { color: "#0d6efd" },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error(err);
//     setStatus("Error occurred. Try again.");
//   }
// };

// const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donor = await createDonor();
//     console.log("✅ Donor created:", donor);

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donor.donorId);
//     console.log("✅ Subscription created:", subRes);

//     if (!subRes.success) {
//       setStatus("Subscription creation failed");
//       return;
//     }

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       modal: {
//         ondismiss: () => {
//           setStatus("Mandate setup cancelled ❌");
//           sessionStorage.removeItem("paymentStarted");
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     // ✅ OPEN RAZORPAY
//     const rzp = new window.Razorpay(options);
//     rzp.open();

//     // ✅ FORCE FULL PAGE REDIRECT (CRITICAL FIX)
//     setTimeout(() => {
//       sessionStorage.removeItem("paymentStarted");

//       window.location.href = `/thankyou/${donor.donorId}`;
//     }, 500); // small delay ensures checkout opens first

//   } catch (err) {
//     console.error(err);
//     setStatus("Error occurred. Try again.");
//     sessionStorage.removeItem("paymentStarted");
//   }
// }; THIS IS LATEST
    // ------------------------------------------------------------------------------------------------------------
// const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donor = await createDonor();
//     console.log("✅ Donor created:", donor);

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donor.donorId);
//     console.log("✅ Subscription created:", subRes);

//     if (!subRes.success) {
//       setStatus("Subscription creation failed");
//       return;
//     }

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//        },
//  handler: () => {
//         // ✅ Razorpay mandate screen completed
//         sessionStorage.removeItem("paymentStarted");

//         navigate("/thankyou", {
//           replace: true,
//           state: {
//             frequency: "monthly",
//             amount: donationData.amount,
//             subscriptionId: subRes.subscription_id,
//             donorId: donorRes.donorId,
//           },
//         });
//       },
//       // /** ✅ THIS IS THE ONLY PLACE YOU REDIRECT */
//       // handler: function (response) {
//       //   console.log("✅ Mandate flow initiated:", response);

//       //   sessionStorage.removeItem("paymentStarted");

//       //   // ✅ FULL PAGE REDIRECT (SAFE)
//       //   window.location.href = `/thankyou/${donor.donorId}`;
//       // },

//       modal: {
//         ondismiss: () => {
//           setStatus("Mandate setup cancelled ❌");
//           sessionStorage.removeItem("paymentStarted");
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (err) {
//     console.error(err);
//     setStatus("Error occurred. Try again.");
//     sessionStorage.removeItem("paymentStarted");
//   }
// };
// const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donor = await createDonor(); // ✅ donor exists

//     if (!donor || !donor.donorId) {
//       throw new Error("Donor ID missing");
//     }

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donor.donorId);

//     if (!subRes || !subRes.subscription_id) {
//       throw new Error("Subscription creation failed");
//     }

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       handler: () => {
//         console.log("✅ Mandate flow completed");

//         sessionStorage.removeItem("paymentStarted");

//         navigate("/thankyou", {
//           replace: true,
//           state: {
//             frequency: "monthly",
//             amount: donationData.amount,
//             subscriptionId: subRes.subscription_id,
//             donorId: donor.donorId, // ✅ CORRECT
//           },
//         });
//       },

//       modal: {
//         ondismiss: () => {
//           setStatus("Mandate cancelled ❌");
//           sessionStorage.removeItem("paymentStarted");
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error("❌ Subscription error:", err);
//     setStatus("Something went wrong. Please try again.");
//     sessionStorage.removeItem("paymentStarted");
//   }
// };
    // -------------------------------------LATEST---------------------------------
// const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donorRes = await createDonor();

//     if (!donorRes?.donorId) {
//       throw new Error("Donor ID missing from backend");
//     }

//     const donorId = donorRes.donorId;
//     console.log("✅ Donor created:", donorId);

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donorId);

//     if (!subRes?.subscription_id) {
//       throw new Error("Subscription not created");
//     }

//     console.log("✅ Subscription created:", subRes.subscription_id);

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       modal: {
//         ondismiss: () => {
//           sessionStorage.removeItem("paymentStarted");

//           // 👉 Even on dismiss, go to thank you
//           navigate("/thankyou", {
//             replace: true,
//             state: {
//               frequency: "monthly",
//               donorId,
//               amount: donationData.amount,
//               subscriptionId: subRes.subscription_id,
//             },
//           });
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     // ✅ OPEN RAZORPAY
//     const rzp = new window.Razorpay(options);
//     rzp.open();

//     // ✅ CRITICAL: FORCE THANK-YOU PAGE (DO NOT WAIT)
//     sessionStorage.removeItem("paymentStarted");

//     navigate("/thankyou", {
//       replace: true,
//       state: {
//         frequency: "monthly",
//         donorId,
//         amount: donationData.amount,
//         subscriptionId: subRes.subscription_id,
//       },
//     });

//   } catch (err) {
//     console.error("❌ Subscription error:", err);
//     setStatus("Error occurred. Try again.");
//     sessionStorage.removeItem("paymentStarted");
//   }
// };
// ---------------------------------------------------------------
 // latest
// const startSubscription = async () => {
//   if (expired) return;

//   try {
//     setStatus("Creating donor...");
//     const donorRes = await createDonor();
//     if (!donorRes?.donorId) throw new Error("Donor creation failed");

//     const donorId = donorRes.donorId;

//     setStatus("Creating subscription...");
//     const subRes = await createSubscription(donorId);
//     if (!subRes?.subscription_id) throw new Error("Subscription failed");

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       handler: () => {
//         sessionStorage.removeItem("paymentStarted");

//         navigate("/thankyou", {
//           replace: true,
//           state: {
//             frequency: "monthly",
//             donorId,
//             amount: donationData.amount,
//             subscriptionId: subRes.subscription_id,
//           },
//         });
//       },

//       modal: {
//         ondismiss: () => {
//           sessionStorage.removeItem("paymentStarted");

//           navigate("/thankyou", {
//             replace: true,
//             state: {
//               frequency: "monthly",
//               donorId,
//               amount: donationData.amount,
//               subscriptionId: subRes.subscription_id,
//             },
//           });
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error("Subscription Error:", err);
//     setStatus("Something went wrong");
//     sessionStorage.removeItem("paymentStarted");
//   }
// };

// -----------------------------------------------------
//     const startSubscription = async () => {
//   if (expired) return;
//   sessionStorage.setItem("paymentStarted", "true");
//   try {
//     setStatus("Creating donor...");
//     const donorRes = await createDonor();
//     if (!donorRes?.donorId) throw new Error("Donor creation failed");

//     const donorId = donorRes.donorId;

//     setStatus("Starting process...");
//     const subRes = await createSubscription(donorId);
//     if (!subRes?.subscription_id) throw new Error("Subscription failed");

//     const options = {
//       key: subRes.keyId,
//       subscription_id: subRes.subscription_id,

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Monthly Donation (e-Mandate)",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       // ✅ User reached bank authorization screen
//       handler: () => {
//         sessionStorage.removeItem("paymentStarted");
//       sessionStorage.removeItem(EXPIRY_KEY);
//         navigate("/thankyou", {
//           replace: true,
//           state: {
//             uiStatus: "INITIATED",
//             frequency: "monthly",
//             donorId,
//             amount: donationData.amount,
//             subscriptionId: subRes.subscription_id,
//           },
//         });
//       },

//       // ❌ User closed Razorpay before completing
//       modal: {
//         ondismiss: () => {
//           sessionStorage.removeItem("paymentStarted");
//   sessionStorage.removeItem(EXPIRY_KEY);
//           navigate("/thankyou", {
//             replace: true,
//             state: {
//               uiStatus: "ABANDONED",
//               frequency: "monthly",
//               donorId,
//               amount: donationData.amount,
//               subscriptionId: subRes.subscription_id,
//             },
//           });
//         },
//       },

//       theme: { color: "#0d6efd" },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error("Subscription Error:", err);
//     setStatus("Something went wrong");
//     sessionStorage.removeItem("paymentStarted");
//     sessionStorage.removeItem(EXPIRY_KEY);
//   }
// };
//     const startMandate = async () => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/emandate/create-order`,
//       donationData
//     );

//     const options = {
//       key: res.data.keyId,
//       order_id: res.data.orderId,
//       amount: res.data.amount,
//       currency: "INR",

//       method: {
//         netbanking: true,
//         card: true,
//         upi: false,
//         wallet: false,
//       },

//       name: "Feed The Hunger Seva Sangha Foundation",
//       description: "Bank e-Mandate Authorization",

//       prefill: {
//         name: `${donationData.firstName} ${donationData.lastName}`,
//         email: donationData.email,
//         contact: donationData.mobile,
//       },

//       handler: async (response) => {
//         await axios.post(`${API_BASE}/emandate/verify`, response);

//         navigate("/thankyou", {
//           replace: true,
//           state: {
//             frequency: "monthly",
//             uiStatus: "MANDATE_CREATED",
//           },
//         });
//       },

//       modal: {
//         ondismiss: () => alert("Mandate cancelled"),
//       },
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error(err);
//     alert("Mandate failed");
//   }
// };
    // -----------------------------testing above logic was working fine
  const startSubscription = async () => {
  if (expired) return;

  sessionStorage.setItem("paymentStarted", "true");

  try {
    setStatus("Creating donor...");
    const donorRes = await createDonor();
    if (!donorRes?.donorId) throw new Error("Donor creation failed");

    const donorId = donorRes.donorId;

    setStatus("Authorizing mandate...");
    const subRes = await createSubscription(donorId);
    if (!subRes?.subscription_id) throw new Error("Subscription failed");

    const options = {
      key: subRes.keyId,
      subscription_id: subRes.subscription_id,

      name: "Feed The Hunger Seva Sangha Foundation",
      description: "Monthly Donation (e-Mandate)",

      prefill: {
        name: `${donationData.firstName} ${donationData.lastName}`,
        email: donationData.email,
        contact: donationData.mobile,
      },

      // ✅ User completed bank authentication
      handler: () => {
        sessionStorage.removeItem("paymentStarted");
        sessionStorage.removeItem(EXPIRY_KEY);

        navigate("/thankyou", {
          replace: true,
          state: {
            uiStatus: "AUTHENTICATED",
            frequency: "monthly",
            donorId,
            subscriptionId: subRes.subscription_id,
            amount: donationData.amount,
          },
        });
      },

      // ❌ User abandoned
      modal: {
        ondismiss: () => {
          sessionStorage.removeItem("paymentStarted");
          sessionStorage.removeItem(EXPIRY_KEY);

          navigate("/thankyou", {
            replace: true,
            state: {
              uiStatus: "ABANDONED",
              frequency: "monthly",
              donorId,
              subscriptionId: subRes.subscription_id,
            },
          });
        },
      },

      theme: { color: "#0d6efd" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong");
    sessionStorage.removeItem("paymentStarted");
    sessionStorage.removeItem(EXPIRY_KEY);
  }
};


  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">
          Razorpay Donation (India Only)
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Time left:{" "}
          <span className="font-semibold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </p>

        {donationData.frequency === "onetime" && (
          <button
            onClick={startPayment}
            disabled={expired}
            className={`w-full py-3 rounded-lg ${
              expired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 text-white"
            }`}
          >
            Pay Once ₹{donationData.amount}
          </button>
        )}
{donationData.frequency === "monthly" && (
  <>
    <button
      onClick={startSubscription}
      disabled={expired}
      className="w-full py-3 rounded-lg bg-blue-600 text-white mb-3"
    >
      Setup Monthly e-Mandate (Subscription)
    </button>
  </>
)}

       

        <p className="mt-4 text-sm text-gray-700">{status}</p>
      </div>
    </div>
  );
}

export default PaymentPage;
// working good 





































