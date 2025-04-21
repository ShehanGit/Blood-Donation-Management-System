import React from 'react';
import { Footer } from "flowbite-react";
import { FaHeart, FaHandHoldingHeart, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";

export default function BloodDonationFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Footer container className="bg-red-800 text-white shadow-lg rounded-t-lg mt-8">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-8 px-4 py-6 md:grid-cols-4 lg:px-6">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <FaHeart className="text-white mr-2 text-2xl" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">BloodFlow</span>
            </div>
            <p className="text-gray-200 mb-4">
              Connecting donors to recipients, saving lives one donation at a time.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-red-300">
                <FaXTwitter className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <Footer.Title title="Our Services" className="text-white text-lg font-bold" />
            <Footer.LinkGroup col className="gap-2">
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Donate Blood</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Find Blood</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Blood Drives</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Host a Drive</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Education</Footer.Link>
            </Footer.LinkGroup>
          </div>
          
          <div>
            <Footer.Title title="Information" className="text-white text-lg font-bold" />
            <Footer.LinkGroup col className="gap-2">
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">About Us</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Donor Eligibility</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">Blood Types</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">FAQs</Footer.Link>
              <Footer.Link href="#" className="text-gray-200 hover:text-red-300">News & Updates</Footer.Link>
            </Footer.LinkGroup>
          </div>
          
          <div>
            <Footer.Title title="Contact Us" className="text-white text-lg font-bold" />
            <div className="text-gray-200 mt-2">
              <div className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2" />
                <span>+1 (888) DONATE-NOW</span>
              </div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="mr-2" />
                <span>contact@lifeflow.org</span>
              </div>
              <div className="flex items-start mb-2">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span>123 Lifesaver Avenue<br />Healthville, CA 90210</span>
              </div>
              <div className="mt-4">
                <button className="bg-white text-red-800 hover:bg-red-200 px-4 py-2 rounded-lg font-semibold flex items-center">
                  <FaHandHoldingHeart className="mr-2" />
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer.Divider className="border-gray-300" />
        
        <div className="w-full px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright 
            href="#" 
            by="LifeFlow Blood Donation System" 
            year={currentYear} 
            className="text-gray-200"
          />
          <div className="mt-4 flex flex-wrap gap-6 sm:mt-0 text-sm text-gray-200">
            <Footer.Link href="#" className="hover:text-red-300">Privacy Policy</Footer.Link>
            <Footer.Link href="#" className="hover:text-red-300">Terms & Conditions</Footer.Link>
            <Footer.Link href="#" className="hover:text-red-300">Accessibility</Footer.Link>
            <Footer.Link href="#" className="hover:text-red-300">Cookie Policy</Footer.Link>
          </div>
        </div>
      </div>
    </Footer>
  );
}