
    // // -------------------------------------------------------------------
    // import React, { useEffect, useState } from "react";
    // import axios from "axios";
    // import { useForm } from "react-hook-form";
    // import config from "../src/config";
    // import { FiInfo } from "react-icons/fi";

    // export default function FilterDonors() {
    //   const API_BASE = `${config.API_URL}/donors`;
    //   const [donors, setDonors] = useState([]);
    //   const [loading, setLoading] = useState(false);

    //   // const { register, getValues, reset } = useForm();
    //   const { register, getValues, reset } = useForm({
    //   defaultValues: {
    //     searchField: "",
    //     searchTerm: "",
    //     frequency: "",
    //     paymentMode: "",
    //     idType: "",
    //     amountMin: "",
    //     amountMax: "",
    //     startDate: "",
    //     endDate: "",
        

    //   },
    // });

    //   const fetchAllDonors = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.get(`${API_BASE}/all`);
    //       setDonors(response.data);
    //     } catch (err) {
    //       console.error(err);
    //       alert("Failed to fetch donors");
    //     }
    //     setLoading(false);
    //   };

    //   useEffect(() => {
    //     fetchAllDonors();
    //   }, []);

    //   const searchDonors = async () => {
    //     const values = getValues();
    //     const payload = {};

    //     // Universal text search
    //     if (values.searchTerm && values.searchField) {
    //       payload[values.searchField] = values.searchTerm;
    //     }

    //     // Dropdown filters
      
    //     if (values.frequency) payload.frequency = values.frequency;
    //     if (values.paymentMode) payload.paymentMode = values.paymentMode;
    //         if (values.idType) payload.idType = values.idType;


    //     // Amount filters
    //     if (values.amountMin) payload.minAmount = values.amountMin;
    //     if (values.amountMax) payload.maxAmount = values.amountMax;
    //     if (values.idType) payload.idType = values.idType;

    //     // Date filters
    //     if (values.startDate) payload.startDate = values.startDate;
    //     if (values.endDate) payload.endDate = values.endDate;

    //     setLoading(true);
    //     try {
    //       const response = await axios.post(`${API_BASE}/filter`, payload);
    //       setDonors(response.data);
    //     } catch (err) {
    //       console.error(err);
    //       alert("Failed to fetch filtered donors");
    //     }
    //     setLoading(false);
    //   };

    //   const resetFilters = () => {
    //     reset();
    //     fetchAllDonors();
    //   };

    //   return (
    //     <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    //       <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
    //         Filter Donors
    //       </h2>

    //       {/* Filter Form */}
    //       <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 hover:shadow-3xl transition-shadow duration-300">
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Search Term</label>
    //             <input
    //               {...register("searchTerm")}
    //               placeholder="Enter text"
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             />
    //           </div>

    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Search Field</label>
    //             <select
    //               {...register("searchField")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             >
    //               <option value="">Select Field</option>
    //               <option value="firstName">First Name</option>
    //               <option value="lastName">Last Name</option>
    //               <option value="email">Email</option>
    //               <option value="mobile">Mobile</option>
    //               <option value="uniqueId">Aadhaar/PAN</option>
    //               <option value="paymentId">Payment ID</option>
    //           <option value="orderId">Order ID</option>
    //           <option value="status">Status</option>
    //           <option value="declaration">Declaration</option>
    //             </select>
    //           </div>

    // <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    //   <div className="flex flex-col">
    //     <label className="text-gray-600 mb-2 font-medium">ID Type</label>
    //     <select
    //       {...register("idType")}
    //       className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //     >
    //       <option value="">Select ID Type</option>
    //       <option value="PAN Card">PAN Card</option>
    //       <option value="Aadhar">Aadhar</option>
    //       <option value="Driving license">Driving License</option>
    //       <option value="VoterID">Voter ID</option>
    //     </select>
    //     <small className="text-gray-400 mt-1">Select the ID type</small>
    //   </div>
    // </div>
    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Frequency</label>
    //             <select
    //               {...register("frequency")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             >
    //               <option value="">Any</option>
    //               <option value="monthly">Monthly</option>
    //               <option value="one-time">One-time</option>
    //             </select>
    //           </div>

    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Payment Mode</label>
    //             <select
    //               {...register("paymentMode")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             >
    //               <option value="">Any</option>
    //               <option value="UPI">UPI</option>
    //               <option value="E-mandate">E-mandate</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Start Date</label>
    //             <input
    //               type="date"
    //               {...register("startDate")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             />
    //           </div>

    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">End Date</label>
    //             <input
    //               type="date"
    //               {...register("endDate")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             />
    //           </div>

    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Min Amount</label>
    //             <input
    //               type="number"
    //               step="0.01"
    //               {...register("amountMin")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             />
    //           </div>

    //           <div className="flex flex-col">
    //             <label className="text-gray-600 mb-2 font-medium">Max Amount</label>
    //             <input
    //               type="number"
    //               step="0.01"
    //               {...register("amountMax")}
    //               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    //             />
    //           </div>
    //         </div>

    //         <div className="flex gap-4">
    //           <button
    //             onClick={searchDonors}
    //             className="bg-button text-white px-6 py-3 rounded-full font-semibold hover:bg-button/20 transition"
    //           >
    //             {loading ? "Searching..." : "Search"}
    //           </button>
    //           <button
    //             onClick={resetFilters}
    //                       className="bg-button text-white px-6 py-3 rounded-full font-semibold hover:bg-button/20 transition"

    //           >
    //             Reset
    //           </button>
    //         </div>
    //       </div>
    // <div className="bg-white rounded-2xl shadow-xl p-4">
    //   <div className="overflow-x-auto">
        
    // {/* Scrollable body */}
    //     <div className=" max-h-[400px] overflow-y-auto">
    //       <table className="min-w-full border-collapse">
    //         <thead className="sticky top-0 bg-gradient-to-r from-purple-200 to-pink-200 z-10">
    //         <tr>
    //           {[
    //         "First Name",
    //         "Last Name",
    //         "Email",
    //         "Mobile",
    //         "ID Type",
    //         "Unique ID",
    //         "Frequency",
    //         "Payment Mode",
    //         "Bank",
    //         "IFSC",
    //         "Account Number",
    //         "Amount",
    //         "Donation Date",
    //         "Wallet",
    //         "Payment ID",
    //         "Order ID",
    //         "Status",
    //         "Declaration",
    //         "Payment Method",
    //         "UPI ID",
    //         "Signature",
    //       ].map((col) => (
    //         <th
    //               key={col}
    //               className="px-4 py-2 border-b text-left text-gray-700 whitespace-nowrap"
    //             >
    //               {col}
    //             </th>
    //           ))}
    //         </tr>
    //         </thead>
    //         <tbody>
    //           {donors.length === 0 && !loading && (
    //             <tr>
    //               <td colSpan={13} className="text-center py-6 text-gray-500">
    //                 No donors found
    //               </td>
    //             </tr>
    //           )}
    //           {donors.map((d, idx) => (
    //             <tr
    //               key={d.id}
    //               className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50 transition`}
    //             >
    //               <td className="border px-4 py-2">{d.firstName}</td>
    //               <td className="border px-4 py-2">{d.lastName}</td>
    //               <td className="border px-4 py-2">{d.email}</td>
    //               <td className="border px-4 py-2">{d.mobile}</td>
    //               <td className="border px-6 py-3">{d.idType}</td>
    //               <td className="border px-4 py-2">{d.uniqueId}</td>
    //               <td className="border px-4 py-2">{d.frequency}</td>
    //               <td className="border px-4 py-2">{d.paymentMode}</td>
    //               <td className="border px-4 py-2">{d.bankName || "-"}</td>
    //               <td className="border px-4 py-2">{d.ifsc || "-"}</td>
    //               <td className="border px-4 py-2">{d.accountNumber || "-"}</td>
    //               <td className="border px-4 py-2">{d.amount}</td>
    //               <td className="border px-4 py-2">{new Date(d.donationDate).toLocaleString()}</td>
    //                 <td className="border px-4 py-2">{d.wallet}</td>
    //                     <td className="border px-4 py-2">{d.paymentId}</td>
    //                     <td className="border px-4 py-2">{d.orderId}</td>
    //                     <td className="border px-4 py-2">{d.status}</td>
    //                     <td className="border px-4 py-2">{d.declaration}</td>
    //                     <td className="border px-4 py-2">{d.paymentMethod}</td>
    //                     <td className="border px-4 py-2">{d.upiId}</td>
    //                     <td className="border px-4 py-2">{d.signature}</td>
    //                     <td className="border px-4 py-2">{d.wallet}</td>



    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //     </div>
    //     </div>
    // </div>
    //   );
    // }
// -------------------------------------------------------------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------
    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { useForm } from "react-hook-form";
    import config from "../src/config";
    import { FiInfo } from "react-icons/fi";

    export default function FilterDonors() {
      const API_BASE = `${config.API_URL}/donors`;
      const [donors, setDonors] = useState([]);
      const [loading, setLoading] = useState(false);

      // const { register, getValues, reset } = useForm();
      const { register, getValues, reset } = useForm({
      defaultValues: {
        searchField: "",
        searchTerm: "",
        frequency: "",
        paymentMode: "",
        idType: "",
        amountMin: "",
        amountMax: "",
        startDate: "",
        endDate: "",
      },
    });

      const fetchAllDonors = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE}/all`);
          setDonors(response.data);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch donors");
        }
        setLoading(false);
      };

      useEffect(() => {
        fetchAllDonors();
      }, []);

      const searchDonors = async () => {
        const values = getValues();
        const payload = {};

        // Universal text search
        if (values.searchTerm && values.searchField) {
          payload[values.searchField] = values.searchTerm;
        }

        // Dropdown filters
      
        if (values.frequency) payload.frequency = values.frequency;
        if (values.paymentMode) payload.paymentMode = values.paymentMode;
            if (values.idType) payload.idType = values.idType;


        // Amount filters
        if (values.amountMin) payload.minAmount = values.amountMin;
        if (values.amountMax) payload.maxAmount = values.amountMax;
        if (values.idType) payload.idType = values.idType;

        // Date filters
        if (values.startDate) payload.startDate = values.startDate;
        if (values.endDate) payload.endDate = values.endDate;
if (values.subscriptionId) payload.subscriptionId = values.subscriptionId;
if (values.subscriptionStatus) payload.subscriptionStatus = values.subscriptionStatus;
if (values.mandateId) payload.mandateId = values.mandateId;
if (values.mandateStatus) payload.mandateStatus = values.mandateStatus;
if (values.paymentInfo) payload.paymentInfo = values.paymentInfo;
if (values.payerEmail) payload.payerEmail = values.payerEmail;
if (values.payerContact) payload.payerContact = values.payerContact;
if (values.monthlyAmount) payload.monthlyAmount = values.monthlyAmount;
if (values.razorpayCustomerId) payload.razorpayCustomerId = values.razorpayCustomerId;

        setLoading(true);
        try {
          const response = await axios.post(`${API_BASE}/filter`, payload);
          setDonors(response.data);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch filtered donors");
        }
        setLoading(false);
      };

      const resetFilters = () => {
        reset();
        fetchAllDonors();
      };

      return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
            Filter Donors
          </h2>

          {/* Filter Form */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 hover:shadow-3xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Search Term</label>
                <input
                  {...register("searchTerm")}
                  placeholder="Enter text"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Search Field</label>
                <select
                  {...register("searchField")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                >
                  <option value="">Select Field</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="email">Email</option>
                  <option value="mobile">Mobile</option>
                  <option value="uniqueId">Aadhaar/PAN</option>
              <option value="declaration">Declaration</option>
               <option value="frequency">Frequency</option>
  <option value="paymentMode">Payment Mode</option>
  <option value="bankName">Bank Name</option>
  <option value="ifsc">IFSC</option>
  <option value="accountNumber">Account Number</option>
  <option value="paymentMethod">Payment Method</option>
  <option value="wallet">Wallet</option>
  <option value="upiId">UPI ID</option>
  <option value="currency">Currency</option>
  <option value="paymentInfo">Payment Info</option>

  {/* RAZORPAY PAYMENT */}
  <option value="paymentId">Payment ID</option>
  <option value="orderId">Order ID</option>
  <option value="signature">Signature</option>
  <option value="status">Status</option>

  {/* PAYER DETAILS */}
  <option value="payerEmail">Payer Email</option>
  <option value="payerContact">Payer Contact</option>

  {/* SUBSCRIPTION FIELDS */}
  <option value="subscriptionId">Subscription ID</option>
  <option value="subscriptionStatus">Subscription Status</option>
  <option value="razorpayCustomerId">Razorpay Customer ID</option>
  <option value="razorpayMandateId">Razorpay Mandate ID</option>
  <option value="mandateId">Mandate ID</option>
  <option value="mandateStatus">Mandate Status</option>
  <option value="donorMandateRefId">Donor Mandate Ref ID</option>
  <option value="monthlyAmount">Monthly Amount</option>


                </select>
              </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="flex flex-col">
        <label className="text-gray-600 mb-2 font-medium">ID Type</label>
        <select
          {...register("idType")}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        >
          <option value="">Select ID Type</option>
          <option value="PAN Card">PAN Card</option>
          <option value="Aadhar">Aadhar</option>
          <option value="Driving license">Driving License</option>
          <option value="VoterID">Voter ID</option>

        </select>
        <small className="text-gray-400 mt-1">Select the ID type</small>
      </div>
    </div>
              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Frequency</label>
                <select
                  {...register("frequency")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                >
                  <option value="">Any</option>
                  <option value="monthly">Monthly</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Payment Mode</label>
                <select
                  {...register("paymentMode")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                >
                  <option value="">Any</option>
                  <option value="UPI">UPI</option>
                  <option value="E-mandate">E-mandate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Start Date</label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">End Date</label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Min Amount</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("amountMin")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-2 font-medium">Max Amount</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("amountMax")}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={searchDonors}
                className="bg-button text-white px-6 py-3 rounded-full font-semibold hover:bg-button/20 transition"
              >
                {loading ? "Searching..." : "Search"}
              </button>
              <button
                onClick={resetFilters}
                          className="bg-button text-white px-6 py-3 rounded-full font-semibold hover:bg-button/20 transition"

              >
                Reset
              </button>
            </div>
          </div>
    <div className="bg-white rounded-2xl shadow-xl p-4">
      <div className="overflow-x-auto">
        
    {/* Scrollable body */}
        <div className=" max-h-[400px] overflow-y-auto">
          <table className="min-w-full border-collapse">
<thead className="sticky top-0 bg-gradient-to-r from-purple-200 to-pink-200 z-10">
  <tr>
    {[
      "First Name",
      "Last Name",
      "Email",
      "Mobile",
      "ID Type",
      "Unique ID",
      "Frequency",
      "Payment Mode",
      "Bank",
      "IFSC",
      "Account Number",
      "Amount",
      "Donation Date",
      "Wallet",
      "Payment ID",
      "Order ID",
      "Status",
      "Declaration",
      "Payment Method",
      "UPI ID",
      "Signature",
      "Payment Info",
      "Payer Email",
      "Payer Contact",
      "Subscription ID",
      "Subscription Status",
      "Mandate ID",
      "Mandate Status",
      "Monthly Amount",
      "Razorpay Customer ID"
    ].map((col) => (
      <th
        key={col}
        className="px-4 py-2 border-b text-left text-gray-700 whitespace-nowrap"
      >
        {col}
      </th>
    ))}
  </tr>
</thead>

            <tbody>
  {donors.length === 0 && !loading && (
    <tr>
      <td colSpan={30} className="text-center py-6 text-gray-500">
        No donors found
      </td>
    </tr>
  )}

  {donors.map((d, idx) => (
    <tr
      key={d.id}
      className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50 transition`}
    >
      <td className="border px-4 py-2">{d.firstName}</td>
      <td className="border px-4 py-2">{d.lastName}</td>
      <td className="border px-4 py-2">{d.email}</td>
      <td className="border px-4 py-2">{d.mobile}</td>
      <td className="border px-4 py-2">{d.idType}</td>
      <td className="border px-4 py-2">{d.uniqueId}</td>
      <td className="border px-4 py-2">{d.frequency}</td>
      <td className="border px-4 py-2">{d.paymentMode}</td>
      <td className="border px-4 py-2">{d.bankName || "-"}</td>
      <td className="border px-4 py-2">{d.ifsc || "-"}</td>
      <td className="border px-4 py-2">{d.accountNumber || "-"}</td>
      <td className="border px-4 py-2">{d.amount}</td>
      <td className="border px-4 py-2">{new Date(d.donationDate).toLocaleString()}</td>
      <td className="border px-4 py-2">{d.wallet}</td>
      <td className="border px-4 py-2">{d.paymentId}</td>
      <td className="border px-4 py-2">{d.orderId}</td>
      <td className="border px-4 py-2">{d.status}</td>
      <td className="border px-4 py-2">{d.declaration ? "Yes" : "No"}</td>
      <td className="border px-4 py-2">{d.paymentMethod}</td>
      <td className="border px-4 py-2">{d.upiId}</td>
      <td className="border px-4 py-2">{d.signature}</td>
      <td className="border px-4 py-2">{d.paymentInfo}</td>
      <td className="border px-4 py-2">{d.payerEmail}</td>
      <td className="border px-4 py-2">{d.payerContact}</td>
      <td className="border px-4 py-2">{d.subscriptionId}</td>
      <td className="border px-4 py-2">{d.subscriptionStatus}</td>
      <td className="border px-4 py-2">{d.mandateId}</td>
      <td className="border px-4 py-2">{d.mandateStatus}</td>
      <td className="border px-4 py-2">{d.monthlyAmount}</td>
      <td className="border px-4 py-2">{d.razorpayCustomerId}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
        </div>
        </div>
    </div>
      );
    }
