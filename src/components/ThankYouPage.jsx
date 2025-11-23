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
// --------------------------------------------------------------------
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ThankYouPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isSubscription = state?.subscriptionId ? true : false;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          🎉 Thank You for Your Kind Support!
        </h2>

        {/* Amount */}
        <p className="text-gray-700 mb-2 text-lg">
          Your {isSubscription ? "monthly" : "one-time"} donation of  
          <span className="font-bold"> ₹{state?.amount}</span>  
          has been received successfully.
        </p>

        {/* PAYMENT / SUBSCRIPTION ID */}
        {isSubscription ? (
          <p className="text-sm text-gray-500 mb-6">
            Subscription ID: <span className="font-semibold">{state.subscriptionId}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Payment ID: <span className="font-semibold">{state.paymentId}</span>
          </p>
        )}

        {/* Back Home */}
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

