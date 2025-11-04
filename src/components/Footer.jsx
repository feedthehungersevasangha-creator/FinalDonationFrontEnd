

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const openContactModal = (e) => {
    e.preventDefault();
    document.dispatchEvent(new Event("openContact")); // trigger ContactUs modal
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    document.dispatchEvent(new Event("openPrivacy")); // trigger PrivacyNotice modal
  };

  return (
    <footer className="bg-heroBG text-text py-8 px-6">
      <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-button">Feed The Hunger</h1>
          <p className="mt-3 text-text text-sm">
            Join our mission to ensure no one in our community goes hungry
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-button">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-text/20">Home</a></li>
            <li><a href="#publications" className="hover:text-text/20">Publications</a></li>
            <li><a href="#press" className="hover:text-text/20">Press Releases</a></li>
            {/* Contact link triggers modal */}
            <li>
              <a
                href="#contact"
                onClick={openContactModal}
                className="hover:text-text/20 cursor-pointer"
              >
                Contact
              </a>
            </li>
            {/* Privacy Policy link triggers modal */}
            <li>
              <a
                href="#privacy"
                onClick={openPrivacyModal}
                className="hover:text-text/20 cursor-pointer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-button">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-text/20">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/feedthehunger.india?igsh=MWs1MmhjMjd3Y3phcQ%3D%3D" target="_blank" rel="noreferrer" className="hover:text-text/20">
              <FaInstagram />
            </a>
           
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-text text-sm mt-8 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} Feed The Hunger. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
