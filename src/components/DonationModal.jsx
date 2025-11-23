import React, { useState, useRef, useEffect } from "react";
import { DonationValidation } from "./DonationValidation";
import "./Donation.css";
import { useNavigate,useLocation  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import config from "../config";

function DonationModal() {
  const API_BASE = `${config.API_URL}`;

  // local UI state
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [inactive, setInactive] = useState(false);
  const timerRef = useRef(null);

  // Declaration fetched from backend
  const location = useLocation();
  const prefillData = location.state?.donationData || null;
  const navigate = useNavigate();
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(DonationValidation),
    mode: "onChange",
    defaultValues:prefillData || { frequency: "monthly" },
  });
  useEffect(() => {
  console.log("📥 Returned from Declaration:", location.state);

  if (location.state?.donationData) {
    console.log("✔ Restoring donationData:", location.state.donationData);
    reset(location.state.donationData);
  } else {
    console.log("❌ No donationData received");
  }

  if (location.state?.declarationChecked) {
    console.log("✔ Declaration was accepted");
    setValue("declaration", true);
  } else {
    console.log("❌ Declaration NOT accepted");
  }
}, [location.state, reset, setValue]);

// useEffect(() => {
//   if (location.state?.donationData) {
//     reset(location.state.donationData);   // restore all inputs correctly
//   }

//   if (location.state?.declarationChecked) {
//     setValue("declaration", true);        // restore declaration
//   }
// }, [location.state, reset, setValue]);

  const frequencyValue = watch("frequency");
  const paymentModeValue = watch("paymentMode");
  // Reset amount fields on frequency change
  useEffect(() => {
    setAmount("");
    setCustomAmount("");
  }, [frequencyValue]);
  useEffect(() => {
  if (frequencyValue === "onetime") {
    setValue("paymentMode", "");
    setValue("bankName", "");
    setValue("ifsc", "");
    setValue("accountNumber", "");
    setValue("accountType", "");
  }
}, [frequencyValue, setValue]);

  // inactivity timer
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setInactive(true);
      alert("You were inactive for 10 minutes. Redirecting to home...");
      navigate("/");
    }, 10 * 60 * 1000);
  };
  useEffect(() => {
    if (!inactive) {
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("click", resetTimer);
      resetTimer();
    }
    return () => {
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inactive]);

  const amounts = {
    monthly: ["800", "1200", "1800","2500"],
    onetime: ["1000","2000", "5000","8000", "10000"],
  };

  const onSubmit = async (data) => {
      console.log("SUBMITTED DECLARATION VALUE:", data.declaration);
    if (!data.declaration) {

      alert("Please accept the declaration before proceeding");
      return;
    }
    const freq = getValues("frequency") || "monthly";

      const  donationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      dob: data.dob,
      idType: data.idType,
      uniqueId: data.uniqueId,
      frequency: freq,
      amount: data.amount === "other" ? data.customAmount : data.amount,
      paymentMode: data.paymentMode,
      bankName: data.bankName,
      ifsc: data.ifsc,
      accountNumber: data.accountNumber,
      declaration: data.declaration,
    };
      navigate("/review", { state: donationData });
  };

  return (
    <div className="donate-container flex flex-col lg:flex-row gap-6 p-6 lg:p-10 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="donate-form flex-1 bg-white p-6 rounded-xl shadow-md"
        style={{ pointerEvents: inactive ? "none" : "auto", opacity: inactive ? 0.5 : 1 }}
      >
        <h2 className="title inline ">Donate</h2>

        {/* Frequency */}
        <div className="form-section">
          <h4>Choose the frequency of your donation</h4>
          {["monthly", "onetime"].map((f) => (
            <label key={f} className="mr-4">
              <input
                type="radio"
                value={f}
                {...register("frequency")}
                checked={frequencyValue === f}
                readOnly
              />
              {f === "monthly" ? " Monthly" : " One Time"}
            </label>
          ))}
        </div>

        {/* Amount */}
        <div className="form-section">
          <h4>Choose the amount of your donation</h4>
          <div className="amount-options">
            {amounts[frequencyValue || "monthly"].map((amt) => (
              <label key={amt} className={`amount-box ${watch("amount") === amt ? "active" : ""}`}>
                <input type="radio" value={amt} {...register("amount")} />
                ₹{amt}
              </label>
            ))}

            <label className={`amount-box other-box ${watch("amount") === "other" ? "active" : ""}`}>
            
              <input type="radio" value="other" {...register("amount")} />other
              {watch("amount") === "other" && (
                <input type="number" placeholder="Enter amount" {...register("customAmount")} autoFocus />
              )}  
            </label>
          </div>
          {errors.amount && <p className="error">{errors.amount.message}</p>}
          {watch("amount") === "other" && errors.customAmount && (
            <p className="error">{errors.customAmount.message}</p>
          )}
        </div>

        {/* Donor Info */}
        <div className="form-section">
          <h4>Who is making this donation?</h4>
          <div className="input-row">
            <select className="border rounded px-2">
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
            <input type="text" placeholder="First Name *" {...register("firstName")} className="border rounded px-2 flex-1" />
            <input type="text" placeholder="Last Name *" {...register("lastName")} className="border rounded px-2 flex-1" />
          </div>
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
{/* Email  */}
<div className="input-row mt-3">
  <input
    type="email"
    placeholder="Email ID *"
    {...register("email")}
    className="border rounded px-2 flex-1"
  />
</div>
{errors.email && <p className="error">{errors.email.message}</p>}

          <input type="tel" placeholder="Mobile Number *" {...register("mobile")} className="border rounded px-2 mt-3 w-full" />
          {errors.mobile && <p className="error">{errors.mobile.message}</p>}
          <label className="block mt-3">Date of Birth *</label>
          <input type="date" {...register("dob")} className="border rounded px-2 mt-3 w-full" />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        {/* Unique ID */}
        <div className="form-section">
          <h4>Unique Identification</h4>
          <div className="input-row">
            <select {...register("idType")} className="border rounded px-2">
              <option value="">Select ID Type</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Aadhar">Aadhar</option>
              <option value="Driving license">Driving License</option>
              <option value="VoterID">Voter ID</option>
            </select>
            <input type="text" placeholder="Enter ID *" {...register("uniqueId")} className="border rounded px-2 flex-1" />
          </div>
          {errors.uniqueId && <p className="error">{errors.uniqueId.message}</p>}
        </div>

        {/* Payment Mode */}
        <div className="form-section">
          {frequencyValue === "monthly" && (
            <div className="input-row mb-2">
              <select {...register("paymentMode")} className="border rounded px-2 mb-2 w-full">
                <option value="">Please Select Donation Mode</option>
                <option value="E-Mandate">E-Mandate</option>
                <option value="UPI">UPI</option>
              </select>
              {errors.paymentMode && <p className="error">{errors.paymentMode.message}</p>}
            </div>
          )}

          {frequencyValue === "monthly" && paymentModeValue === "E-Mandate" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
              <input type="text" placeholder="Bank Name" {...register("bankName")} className="border rounded px-2 w-full" />
              <input type="text" placeholder="IFSC Code" {...register("ifsc")} className="border rounded px-2 w-full" />
              <select {...register("accountType")} className="border rounded px-2 w-full">
                <option>Savings</option>
              </select>
              <input type="text" placeholder="Account Number" {...register("accountNumber")} className="border rounded px-2 w-full" />
            </div>
          )}

          {frequencyValue === "onetime" && (
            <div className="input-row mt-2 gap-2 flex flex-col md:flex-row">
              <input type="text" placeholder="IFSC Code" {...register("ifsc")} className="border rounded px-2 flex-1" />
              <select className="border rounded px-2">
                <option>Savings</option>
              </select>
              <input type="text" placeholder="Account Number" {...register("accountNumber")} className="border rounded px-2 flex-1" />
            </div>
          )}

          {errors.bankName && <p className="error">{errors.bankName.message}</p>}
          {errors.ifsc && <p className="error">{errors.ifsc.message}</p>}
          {errors.accountNumber && <p className="error">{errors.accountNumber.message}</p>}
        </div>

        {/* Declaration */}
<div className="form-section mt-4">

  <div className="flex items-center gap-3 w-full max-w-[500px]">

    {/* Checkbox */}
    <input
      type="checkbox"
      {...register("declaration")}
      className="hidden"
    />

    {/* Text */}
    <span className="text-sm text-gray-700">
      I am an Indian Citizen and I have read & understood the{" "}
      <span
        // onClick={() => navigate("/declaration")}
        onClick={() =>
  navigate("/declaration", {
  state: {
    donationData: getValues(),   // ⭐ use same variable name as review flow
  },
})
}
        className="text-blue-600 hover:underline cursor-pointer font-medium"
      >
        declaration
      </span>
    </span>
  </div>

  {errors.declaration && (
    <p className="error mt-1">{errors.declaration.message}</p>
  )}
</div>
<button type="submit" className="donate-btn">
  Proceed to Verify Details
</button>
      </form>

      <div className="donate-info">
        <div className="info-box bg-white shadow-md rounded-xl p-6 space-y-4 text-gray-800">
          {/* QR Payment Section */}
<div className="mt-4">
  <h3 className="text-lg font-semibold border-b pb-2 mb-2">
    Pay Using QR Code
  </h3>

  <div className="flex justify-center">
    <img
      src="QRCode.jpg"   // <-- Replace with your QR image path
      alt="Donate QR Code"
      className="w-40 sm:w-48 md:w-56 lg:w-64 rounded-lg shadow"
    />
  </div>

  <p className="text-center text-sm mt-3 text-gray-600">
    Scan this QR code using any UPI app to make a quick donation.
  </p>
</div>
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Contact Us</h3>
            <p className="text-sm">If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            {/* <p className="text-sm font-medium">Email: <span className="font-normal">feedthehunger.india2025@gmail.com</span></p> */}
                        <p className="text-sm font-medium">Email: <span className="font-normal">supporter.services@feedthehungersevasangha.org</span></p>

            <p className="text-sm font-medium">Call: <span className="font-normal">8884260100</span></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Terms & Conditions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><span className="font-medium">Donations</span> will be accepted only from Indian citizens.</li>
              <li>No donations are accepted from corporate entities or any Government agencies.</li>
              <li>All donations are received through <span className="font-medium">Credit Card, NACH, e-Mandates, online transfers, or cheques/drafts</span>, but never in cash.</li>
              <li>Your donation is critical in running campaigns and enabling victories — we cannot do it without your help.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationModal;




