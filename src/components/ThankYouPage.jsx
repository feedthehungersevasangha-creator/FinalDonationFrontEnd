
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

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from "../config";

const API_BASE = `${config.API_URL}`;

function ThankYouPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donorId } = useParams();

  const isSubscription = state?.frequency === "monthly";

  const downloadReceipt = () => {
    if (!donorId) {
      alert("Receipt not yet available");
      return;
    }

    window.open(
      `${API_BASE}/api/donors/download/${donorId}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

        <h2 className="text-2xl font-bold mb-4 text-green-600">
          🎉 Thank You for Your Support!
        </h2>

        <p className="text-gray-700 mb-2 text-lg">
          {isSubscription ? "Monthly donation" : "One-time donation"} of
          <span className="font-bold"> ₹{state?.amount}</span>
        </p>

        {isSubscription ? (
          <>
            <p className="text-sm text-gray-500 mb-2">
              Subscription ID:
              <br />
              <b>{state?.subscriptionId}</b>
            </p>

            <p className="text-sm text-orange-600 mb-4">
              Mandate confirmation & receipts will be sent by email
              once approved by your bank.
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 mb-2">
            Payment ID: <b>{state?.paymentId}</b>
          </p>
        )}

        {/* ✅ ONLY SHOW DOWNLOAD FOR ONE-TIME */}
        {!isSubscription && (
          <button
            onClick={downloadReceipt}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mb-4"
          >
            Download Receipt
          </button>
        )}

        <br />

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>

      </div>
    </div>
  );
}

export default ThankYouPage;


