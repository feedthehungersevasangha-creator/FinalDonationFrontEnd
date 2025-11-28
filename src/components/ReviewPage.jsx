

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import config from "../config";

// function ReviewPage() {
//   const navigate = useNavigate();
//   const { state: donationData } = useLocation();
//   const API_BASE = `${config.API_URL}`;

//   if (!donationData) {
//     // user came directly without form submission
//     navigate("/");
//     return null;
//   }

// // const handleEdit = () => {
// //   navigate("/donate", { state: { fromReview: true, donationData } });
// // };
// const handleEdit = () => {
//   navigate("/donate", {
//     state: {
//       fromReview: true,
//      donationData: {
//        ...donationData,
//        declaration:
//          donationData.declaration === true ||
//          donationData.declaration === "Accepted",
//      }
//     }
//   });
// };

//   const handleConfirm = async () => {
//     try {
//       // await axios.post(`${API_BASE}/donors/save`, donationData);
//       // alert("Donation details saved successfully ✅");
//       // later, redirect to Razorpay page
//       navigate("/payment", { state: donationData });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save donation ❌");
//     }
//   };
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
//       <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-4 text-center">Review Your Donation</h2>
//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Please verify that all the information below is correct before proceeding.
//         </p>

//         <div className="space-y-3 text-gray-800">
//           <div><strong>Name:</strong> {donationData.firstName} {donationData.lastName}</div>
//           <div><strong>Email:</strong> {donationData.email}</div>
//           <div><strong>Mobile:</strong> {donationData.mobile}</div>
//           <div><strong>Date of Birth:</strong> {donationData.dob}</div>
//           <div><strong>ID Type:</strong> {donationData.idType}</div>
//           <div><strong>Unique ID:</strong> {donationData.uniqueId}</div>
//           <div><strong>Frequency:</strong> {donationData.frequency}</div>
//           <div><strong>Amount:</strong> ₹{donationData.amount}</div>
//           {/* <div><strong>Accepted Declaration:</strong> {donationData.declaration}</div> */}
//           <div>
//   <strong>Accepted Declaration:</strong> 
//   {donationData.declaration ? "Accepted" : "Not Accepted"}
// </div>

//            {donationData.paymentMode && (
//             <div><strong>Payment Mode:</strong> {donationData.paymentMode}</div>
//           )}
//           {donationData.bankName && (
//             <>
//               <div><strong>Bank Name:</strong> {donationData.bankName}</div>
//               <div><strong>IFSC:</strong> {donationData.ifsc}</div>
//               <div><strong>Account Number:</strong> {donationData.accountNumber}</div>
//             </>
//           )} 
//         </div>
//         <div className="mt-8 flex justify-between">
//           <button
//             onClick={handleEdit}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Edit Details
//           </button>
//           <button
//             onClick={handleConfirm}
//             className="bg-button text-white px-4 py-2 rounded hover:bg-primary/70"
//           >
//             Confirm & Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ReviewPage;



import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function ReviewPage() {
  const navigate = useNavigate();
  const { state: donationData } = useLocation();
  const API_BASE = `${config.API_URL}`;

  if (!donationData) {
    // user came directly without form submission
    navigate("/");
    return null;
  }

// const handleEdit = () => {
//   navigate("/donate", { state: { fromReview: true, donationData } });
// };
const handleEdit = () => {
  navigate("/donate", {
    state: {
      fromReview: true,
     donationData: {
       ...donationData,
         startDay: donationData.startDay,  // ⭐ keep this
       declaration:
         donationData.declaration === true ||
         donationData.declaration === "Accepted",
     }
    }
  });
};

  const handleConfirm = async () => {
    try {
      // await axios.post(`${API_BASE}/donors/save`, donationData);
      // alert("Donation details saved successfully ✅");
      // later, redirect to Razorpay page
      navigate("/payment", { state: donationData });
    } catch (err) {
      console.error(err);
      alert("Failed to save donation ❌");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Review Your Donation</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please verify that all the information below is correct before proceeding.
        </p>

        <div className="space-y-3 text-gray-800">
          <div><strong>Name:</strong> {donationData.firstName} {donationData.lastName}</div>
          <div><strong>Email:</strong> {donationData.email}</div>
          <div><strong>Mobile:</strong> {donationData.mobile}</div>
          <div><strong>Date of Birth:</strong> {donationData.dob}</div>
          <div><strong>ID Type:</strong> {donationData.idType}</div>
          <div><strong>Unique ID:</strong> {donationData.uniqueId}</div>
          <div><strong>Frequency:</strong> {donationData.frequency}</div>
          <div><strong>Amount:</strong> ₹{donationData.amount}</div>
          {/* <div><strong>Accepted Declaration:</strong> {donationData.declaration}</div> */}
          <div>
  <strong>Accepted Declaration:</strong> 
  {donationData.declaration ? "Accepted" : "Not Accepted"}
</div>
{donationData.frequency === "monthly" && (
  <div><strong>Mandate Start Date:</strong> {donationData.startDay}th of next month</div>
)}

          
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Edit Details
          </button>
          <button
            onClick={handleConfirm}
            className="bg-button text-white px-4 py-2 rounded hover:bg-primary/70"
          >
            Confirm & Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReviewPage;



