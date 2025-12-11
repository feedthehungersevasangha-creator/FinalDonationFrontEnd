
// --------------------------------------------------------------------
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const isSubscription = state?.subscriptionId ? true : false;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🎉 Thank You for Your Kind Support!
//         </h2>

//         {/* Amount */}
//         <p className="text-gray-700 mb-2 text-lg">
//           Your {isSubscription ? "monthly" : "one-time"} donation of  
//           <span className="font-bold"> ₹{state?.amount}</span>  
//           has been received successfully.
//         </p>

//         {/* PAYMENT / SUBSCRIPTION ID */}
//         {isSubscription ? (
//           <p className="text-sm text-gray-500 mb-6">
//             Subscription ID: <span className="font-semibold">{state.subscriptionId}</span>
//           </p>
//         ) : (
//           <p className="text-sm text-gray-500 mb-6">
//             Payment ID: <span className="font-semibold">{state.paymentId}</span>
//           </p>
//         )}

//         {/* Back Home */}
//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;

// /-----------------------------------------------------------------------------
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h2>
//         <p className="text-gray-700 mb-4">
//           Your donation of ₹{state?.amount} has been received successfully.
//         </p>
//         <p className="text-sm text-gray-500 mb-6">Payment ID: {state?.paymentId}</p>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-button text-white px-4 py-2 rounded hover:bg-primary/70"
//         >
//           Go Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";
// const API_BASE = `${config.API_URL}`;

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const donorId = state?.donorId; // ⭐ GET DONOR ID
//   const isSubscription = state?.subscriptionId ? true : false;

//   const downloadReceipt = () => {
//     if (!donorId) return alert("Receipt unavailable");
//     window.open(`${API_BASE}/donors/download/${donorId}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🎉 Thank You for Your Kind Support!
//         </h2>

//         <p className="text-gray-700 mb-2 text-lg">
//           Your {isSubscription ? "monthly" : "one-time"} donation of  
//           <span className="font-bold"> ₹{state?.amount}</span>  
//           has been received successfully.
//         </p>

//         {/* Show ID */}
//         {isSubscription ? (
//           <p className="text-sm text-gray-500 mb-2">
//             Subscription ID: <b>{state.subscriptionId}</b>
//           </p>
//         ) : (
//           <p className="text-sm text-gray-500 mb-2">
//             Payment ID: <b>{state.paymentId}</b>
//           </p>
//         )}

//         {/* ⭐ DOWNLOAD RECEIPT BUTTON */}
//         <button
//           onClick={downloadReceipt}
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
//         >
//           Download Receipt
//         </button>

//         <br />

//         {/* Back Home */}
//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;

// //--------------------------------------------------------------------------------------------------------


// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { donorId } = useParams();   // ✅ NOW PERSISTENT

//   const isSubscription = !!state?.subscriptionId;

//   const downloadReceipt = () => {
//     console.log("📄 Download receipt clicked");
//   console.log("➡️ donorId used for download:", donorId);
//     if (!donorId) {
//           console.error("❌ Donor ID missing");
//       alert("Receipt unavailable");
//       return;
//     }

//     window.open(
//       `${API_BASE}/api/donors/download/${donorId}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🎉 Thank You for Your Kind Support!
//         </h2>

//         <p className="text-gray-700 mb-2 text-lg">
//           Your {isSubscription ? "monthly" : "one-time"} donation of
//           <span className="font-bold"> ₹{state?.amount}</span>
//           has been received successfully.
//         </p>

//         {isSubscription ? (
//           <p className="text-sm text-gray-500 mb-2">
//             Subscription ID: <b>{state?.subscriptionId}</b>
//           </p>
//         ) : (
//           <p className="text-sm text-gray-500 mb-2">
//             Payment ID: <b>{state?.paymentId}</b>
//           </p>
//         )}

//         {/* ✅ DOWNLOAD RECEIPT */}
//         <button
//           onClick={downloadReceipt}
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
//         >
//           Download Receipt
//         </button>

//         <br />

//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;

// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { donorId } = useParams();

//   const isSubscription = state?.frequency === "monthly";

//   const downloadReceipt = () => {
//     if (!donorId) {
//       alert("Receipt not yet available");
//       return;
//     }

//     window.open(
//       `${API_BASE}/api/donors/download/${donorId}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🎉 Thank You for Your Support!
//         </h2>

//         <p className="text-gray-700 mb-2 text-lg">
//           {isSubscription ? "Monthly donation" : "One-time donation"} of
//           <span className="font-bold"> ₹{state?.amount}</span>
//         </p>

//         {isSubscription ? (
//           <>
//             <p className="text-sm text-gray-500 mb-2">
//               Subscription ID:
//               <br />
//               <b>{state?.subscriptionId}</b>
//             </p>

//             <p className="text-sm text-orange-600 mb-4">
//               Mandate confirmation & receipts will be sent by email
//               once approved by your bank.
//             </p>
//           </>
//         ) : (
//           <p className="text-sm text-gray-500 mb-2">
//             Payment ID: <b>{state?.paymentId}</b>
//           </p>
//         )}

//         {/* ✅ ONLY SHOW DOWNLOAD FOR ONE-TIME */}
//         {!isSubscription && (
//           <button
//             onClick={downloadReceipt}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
//           >
//             Download Receipt
//           </button>
//         )}

//         <br />

//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>

//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;


// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function ThankYouPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { donorId } = useParams();

//   // ✅ SAFE FALLBACKS (important after full reload)
//   const frequency = state?.frequency || "monthly"; // default monthly
//   const amount = state?.amount || "--";
//   const subscriptionId = state?.subscriptionId || null;
//   const paymentId = state?.paymentId || null;

//   const isSubscription = frequency === "monthly";

//   const downloadReceipt = () => {
//     if (!donorId) {
//       alert("Receipt not yet available");
//       return;
//     }

//     window.open(
//       `${API_BASE}/api/donors/download/${donorId}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🙏 Thank You for Your Support!
//         </h2>

//         {/* ✅ SUBSCRIPTION MESSAGE */}
//         {isSubscription ? (
//           <>
//             <p className="text-gray-800 mb-3 text-lg font-medium">
//               Thank you for setting up a <b>Monthly e-Mandate</b>.
//             </p>

//             <p className="text-gray-700 mb-2">
//               Monthly Amount: <b>₹{amount}</b>
//             </p>

//             {subscriptionId && (
//               <p className="text-sm text-gray-500 mb-3">
//                 Subscription ID:
//                 <br />
//                 <b className="break-all">{subscriptionId}</b>
//               </p>
//             )}

//             <p className="text-sm text-orange-600 leading-relaxed mb-4">
//               Your bank authorization is under process.
//               <br />
//               ✅ Once approved, donations will be debited monthly.
//               <br />
//               📧 Mandate confirmation & receipts will be sent to your email.
//             </p>
//           </>
//         ) : (
//           <>
//             {/* ✅ ONE-TIME MESSAGE */}
//             <p className="text-gray-700 mb-2 text-lg">
//               One-time donation of{" "}
//               <span className="font-bold">₹{amount}</span>
//             </p>

//             {paymentId && (
//               <p className="text-sm text-gray-500 mb-3">
//                 Payment ID: <b>{paymentId}</b>
//               </p>
//             )}

//             <button
//               onClick={downloadReceipt}
//               className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
//             >
//               Download Receipt
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => navigate("/")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>

//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;
// ---------------------------------------------------------------------------------------------------
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import config from "../config";

// const API_BASE = `${config.API_URL}`;

// function ThankYouPage() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // ✅ HARD SAFETY (prevents white page)
//   // if (!state) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//   //       <div className="bg-white p-6 rounded-xl shadow text-center">
//   //         <h2 className="text-xl font-semibold text-green-600">
//   //           🙏 Thank You!
//   //         </h2>
//   //         <p className="text-gray-600 mt-2">
//   //           Your donation is being processed.
//   //           <br />
//   //           Please check your email for confirmation.
//   //         </p>

//   //         <button
//   //           onClick={() => navigate("/")}
//   //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//   //         >
//   //           Go Home
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   // }

// if (!state) {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow text-center">
//         <h2>🙏 Thank You</h2>
//         <p>Your mandate is being processed.</p>
//         <button onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     </div>
//   );
// }


//   const {
//     frequency,
//     amount,
//     subscriptionId,
//     donorId,
//     paymentId,
//   } = state;

//   const isSubscription = frequency === "monthly";

//   const downloadReceipt = () => {
//     if (!donorId) {
//       alert("Receipt not available yet");
//       return;
//     }

//     window.open(
//       `${API_BASE}/donors/download/${donorId}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           🙏 Thank You for Your Support!
//         </h2>

//         {isSubscription ? (
//           <>
//             <p className="text-lg text-gray-800 font-medium mb-2">
//               Monthly e-Mandate Setup Successful
//             </p>

//             <p className="text-gray-700 mb-2">
//               Monthly Amount: <b>₹{amount}</b>
//             </p>

//             {subscriptionId && (
//               <p className="text-sm text-gray-500 mb-3">
//                 Subscription ID:
//                 <br />
//                 <b className="break-all">{subscriptionId}</b>
//               </p>
//             )}

//             <p className="text-sm text-orange-600 leading-relaxed">
//               ✅ Your bank authorization is in progress.
//               <br />
//               📧 Mandate confirmation & monthly receipts
//               will be sent by email after approval.
//             </p>
//           </>
//         ) : (
//           <>
//             <p className="text-lg text-gray-800 mb-2">
//               One-time donation of <b>₹{amount}</b>
//             </p>

//             {paymentId && (
//               <p className="text-sm text-gray-500 mb-3">
//                 Payment ID: <b>{paymentId}</b>
//               </p>
//             )}

//             <button
//               onClick={downloadReceipt}
//               className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
//             >
//               Download Receipt
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Go Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ThankYouPage;
// ---------------------------------------------------------------------------
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const API_BASE = `${config.API_URL}`;

function ThankYouPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // -------------------------------------------------------
  // 🛑 SAFETY: If no state → show general Thank You message
  // -------------------------------------------------------
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center max-w-md">
          <h2 className="text-xl font-semibold text-green-600">🙏 Thank You!</h2>
          <p className="text-gray-700 mt-2">
            Your donation / mandate is being processed.
            <br />
            You will receive an email update shortly.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------------
  // Extract values passed from PaymentPage
  // -----------------------------------------------
  const { frequency, amount, subscriptionId, donorId, paymentId } = state;

  const isSubscription = frequency === "monthly";

  // -----------------------------------------------
  // Download Receipt (One-time only)
  // -----------------------------------------------
  const downloadReceipt = () => {
    if (!donorId) {
      alert("Receipt not available yet");
      return;
    }

    window.open(`${API_BASE}/donors/download/${donorId}`, "_blank");
  };

  // -----------------------------------------------
  // UI
  // -----------------------------------------------
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          🙏 Thank You for Your Support!
        </h2>

        {/* ─────────────────────────────────────────── */}
        {/* MONTHLY SUBSCRIPTION / E-MANDATE MESSAGE */}
        {/* ─────────────────────────────────────────── */}
        {isSubscription ? (
          <>
            <p className="text-lg text-gray-800 font-medium mb-2">
              Thanks for initiating your Monthly e-Mandate
            </p>

            <p className="text-gray-700 mb-2">
              Monthly Amount: <b>₹{amount}</b>
            </p>

            {subscriptionId && (
              <p className="text-sm text-gray-600 mb-3 break-words">
                Subscription ID:
                <br />
                <b>{subscriptionId}</b>
              </p>
            )}

            <p className="text-sm text-orange-600 leading-relaxed mt-3">
              🔄 Your bank is processing your mandate request.
              <br />  
              Once approved, you will receive:
              <br />
              ✔ Mandate Confirmation Receipt  
              ✔ Monthly Debit Receipts (Every month)
            </p>

            <p className="text-sm text-gray-500 mt-3">
              If the mandate fails / rejected,  
              you will receive an SMS or Email notification.
            </p>
          </>
        ) : (
          <>
            {/* ─────────────────────────────────────────── */}
            {/* ONE-TIME PAYMENT MESSAGE */}
            {/* ─────────────────────────────────────────── */}
            <p className="text-lg text-gray-800 mb-2">
              One-time donation of <b>₹{amount}</b>
            </p>

            {paymentId && (
              <p className="text-sm text-gray-600 mb-3">
                Payment ID: <b>{paymentId}</b>
              </p>
            )}

            <button
              onClick={downloadReceipt}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
            >
              Download Receipt
            </button>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default ThankYouPage;







