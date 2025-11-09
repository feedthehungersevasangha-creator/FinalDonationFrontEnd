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
console.log(config.Razor_Pay);

  // local UI state
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [inactive, setInactive] = useState(false);
  const timerRef = useRef(null);

  // Declaration fetched from backend
  const [declarationData, setDeclarationData] = useState({ title: "", content: "" });
  const [loadingDeclaration, setLoadingDeclaration] = useState(true);
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

  const frequencyValue = watch("frequency");
  const paymentModeValue = watch("paymentMode");
  const declarationChecked = watch("declaration");
const emailValue = watch("email");

useEffect(() => {
  // If email changes, invalidate previously-sent OTP & verification
  // but only do that if otpVerified or otpSent was true (to avoid trivial resets)
  if (otpSent || otpVerified) {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
  }
  // we intentionally do not call reset() here — we just reset otp state
}, [emailValue]);
  // Reset amount fields on frequency change
  useEffect(() => {
    setAmount("");
    setCustomAmount("");
  }, [frequencyValue]);
useEffect(() => {
    if (prefillData) {
      reset(prefillData);
    }
  }, [prefillData, reset]);
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

  // Fetch declaration from backend
  useEffect(() => {
    const fetchDeclaration = async () => {
      try {
        const res = await axios.get(`${API_BASE}/declaration`);
        setDeclarationData(res.data);
      } catch (err) {
        console.error("Failed to fetch declaration:", err);
        setDeclarationData({
          title: "Declaration & Guidelines",
          content:
            "Donations are accepted only from Indian citizens. Please ensure details provided are correct.",
        });
      } finally {
        setLoadingDeclaration(false);
      }
    };
    fetchDeclaration();
  }, []);

  // // OTP handlers
  // const sendOtp = async () => {
  //   const email = getValues("email");
  //   if (!email) return alert("Enter email first");
  //   try {
  //     await axios.post(`${API_BASE}/otp/request?email=${encodeURIComponent(email)}`);
  //     alert("OTP sent to your email ✅");
  //     setOtpSent(true);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to send OTP ❌");
  //   }
  // };

  // const verifyOtp = async () => {
  //   const email = getValues("email");
  //   if (!email || !otp) return alert("Enter OTP");
  //   try {
  //     await axios.post(
  //       `${API_BASE}/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
  //     );
  //     setOtpVerified(true);
  //     alert("Email verified successfully ✅");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Invalid OTP ❌");
  //   }
  // };
const sendOtp = async () => {
  const email = getValues("email");
  if (!email) return alert("Enter email first");
  try {
    await axios.post(`${API_BASE}/otp/request?email=${encodeURIComponent(email)}`);
    alert(`OTP sent to ${email} ✅`);
    setOtpSent(true);
    setOtpVerified(false);
    setOtp("");
  } catch (err) {
    console.error(err);
    alert("Failed to send OTP ❌");
  }
};

const verifyOtp = async () => {
  const email = getValues("email");
  if (!email || !otp) return alert("Enter OTP");
  try {
    await axios.post(
      `${API_BASE}/otp/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
    );
    setOtpVerified(true);
    alert("Email verified successfully ✅");
  } catch (err) {
    console.error(err);
    alert("Invalid OTP ❌");
    setOtpVerified(false);
  }
};

  const amounts = {
    monthly: ["800", "1200", "1800"],
    onetime: ["2000", "5000", "10000"],
  };

  const onSubmit = async (data) => {
    if (!otpVerified) {
      alert("Please verify your email with OTP before proceeding");
      return;
    }
    if (!data.declaration) {
      alert("Please accept the declaration before proceeding");
      return;
    }

    const freq = getValues("frequencyValue") || "monthly";

    const donationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      dob: data.dob,
      idType: data.idType,
      uniqueId: data.uniqueId,
      address: data.address,
      frequency: freq,
      amount: data.amount === "other" ? data.customAmount : data.amount,
      paymentMode: data.paymentMode,
      bankName: data.bankName,
      ifsc: data.ifsc,
      accountNumber: data.accountNumber,
    };
      navigate("/review", { state: donationData });

    // try {
    //   await axios.post(`${API_BASE}/donors/save`, donationData);
    //   alert("Donation details saved successfully ");
    //   setAmount("");
    //   setCustomAmount("");
    //   setOtpSent(false);
    //   setOtpVerified(false);
    //   setOtp("");
    //   reset();
    //   navigate("/");
    // } catch (err) {
    //   console.error(err);
    //   alert("Failed to save donation ");
    // }
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
{/* Email + OTP */}
<div className="input-row mt-3">
  <input
    type="email"
    placeholder="Email ID *"
    {...register("email")}
    // user can edit email unless it's verified — this is good UX
    disabled={otpVerified}
    className="border rounded px-2 flex-1"
  />
  {/* Show Send or Resend based on otpSent and otpVerified */}
  {!otpVerified && (
    <button
      type="button"
      onClick={sendOtp}
      className={`otp-btn text-white px-3 rounded ${!otpSent ? "bg-button" : "bg-gray-600"}`}
    >
      {otpSent ? "Resend OTP" : "Send OTP"}
    </button>
  )}
</div>

{errors.email && <p className="error">{errors.email.message}</p>}

{/* OTP entry shown while OTP sent and not yet verified */}
{otpSent && !otpVerified && (
  <div className="input-row mt-2">
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className="border rounded px-2 flex-1"
    />
    <button type="button" onClick={verifyOtp} className="verify-btn bg-button text-text px-3 rounded">
      Verify
    </button>
  </div>
)}

{otpVerified && <p className="text-button">✅ Email Verified</p>}

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
          <textarea placeholder="Address *" {...register("address")} className="border rounded px-2 w-full mt-3"></textarea>
          {errors.address && <p className="error">{errors.address.message}</p>}
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
        <div className="form-section flex items-center">
          <input type="checkbox" {...register("declaration")} className="mr-2" />
          I am an Indian Citizen and I have read & understood the{" "}
          <a onClick={() => setShowDeclaration(true)} className="text-text cursor-pointer">
            declaration
          </a>
        </div>
        {errors.declaration && <p className="error">{errors.declaration.message}</p>}

        <button type="submit" className="donate-btn">
          Proceed to Verify Details
        </button>
      </form>

      {/* Declaration Popup */}
      {showDeclaration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-button w-1/2 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center">
              {loadingDeclaration ? (
                <p>Loading...</p>
              ) : (
                <h2 className="text-xl font-bold">{declarationData.title}</h2>
              )}
              <button onClick={() => setShowDeclaration(false)}>✖</button>
            </div>
            <div className="mt-4 max-h-60 overflow-y-auto">
              {loadingDeclaration ? <p>Loading...</p> : <p>{declarationData.content}</p>}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowDeclaration(false)} className="bg-primary text-text px-3 py-1 rounded">
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="donate-info">
        <div className="info-box bg-white shadow-md rounded-xl p-6 space-y-4 text-gray-800">
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Contact Us</h3>
            <p className="text-sm">If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="text-sm font-medium">Email: <span className="font-normal">feedthehunger.india2025@gmail.com</span></p>
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
