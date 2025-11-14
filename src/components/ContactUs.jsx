import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";
import axios from "axios";
import config from "../config";

export default function ContactUs() {
  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const openContact = () => {
    setVisible(true);
    setTimeout(() => setShowContent(true), 100);
  };

  const closeContact = () => {
    setShowContent(false);
    setTimeout(() => setVisible(false), 300);
  };

  useEffect(() => {
    const handleOpen = () => openContact();
    document.addEventListener("openContact", handleOpen);
    return () => document.removeEventListener("openContact", handleOpen);
  }, []);
  const onSubmit = (data) => {
  setSending(true);
  axios.post(`${config.API_URL}/contact`, data)
    .then(() => {
      alert("Message sent successfully!");
      reset();
      setSending(false);
      closeContact();
    })
    .catch((error) => {
      alert("Failed to send message. Please try again.");
      console.error(error);
      setSending(false);
    });
};
  // const onSubmit = (data) => {
  //   setSending(true);
  //   emailjs
  //     .send(
  //       "YOUR_SERVICE_ID", // replace with your EmailJS service ID
  //       "YOUR_TEMPLATE_ID", // replace with your EmailJS template ID
  //       {
  //         user_email: data.email,
  //         subject: data.title,
  //         message: data.message,
  //       },
  //       "YOUR_PUBLIC_KEY" // replace with your EmailJS public key
  //     )
  //     .then(
  //       () => {
  //         alert("Message sent successfully!");
  //         reset();
  //         setSending(false);
  //         closeContact();
  //       },
  //       (error) => {
  //         alert("Failed to send message. Please try again.");
  //         console.error(error);
  //         setSending(false);
  //       }
  //     );
  // };

  if (!visible) return null;

  return (
    <div
      id="contact"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-transform duration-300 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <button
            onClick={closeContact}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold transition"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          If you have questions or concerns about our services, please enter your query below:
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          

          {/* Title */}
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-button transition"
              placeholder="Enter subject/title"
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>
{/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Your Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>
          {/* Message */}
          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <textarea
              {...register("message", { required: true })}
              className="border p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-button transition"
              placeholder="Type your message here..."
            />
            {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="bg-gradient-to-r from-button to-button/5 text-text px-6 py-3 rounded-full font-semibold hover:from-button hover:to-button transition w-full"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
