import React from 'react'
import { FaArrowRight, FaEnvelope, FaGreaterThan, FaHome, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import img from "../../assets/banner/contact-banner.jpg";
            
const Contact = () => {
  return (


<section className="">
   <div className="relative mb-16">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${img})`,
            height: "300px",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white py-16">
        <p className='uppercase font-bold text-xl'>Contact us</p>
          <nav className="flex justify-center space-x-3 py-8">
          
            <Link
              to="/"
              className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
            >
              <FaHome className='text-blue-300' size={20}/>
            </Link>
            <span className="text-lg text-gray-300 mt-1"><FaGreaterThan size={15}/></span>
            <Link
              to="/contact"
              className="text-base font-medium hover:text-gray-300 transition-all duration-200"
            >
             Contact
            </Link>
          </nav>
        </div>
      </div>
  <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12">
        <p className="text-lg text-justify lg:text-left">
          At the same time, the fact that we are wholly owned and totally independent from
          manufacturer and other group control gives you confidence that we will only recommend what
          is right for you.
        </p>

      
        <ul className="mt-6 space-y-5 text-sm list-none pl-0">
                  <li className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center  justify-center lg:justify-start">
                    <FaPhoneAlt  size={22} className="text-black mr-4" />
                    <span className="text-[16px]"> +8809614502010</span>
                  </li>

                  <li className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center  justify-center lg:justify-start">
                    <FaEnvelope size={22} className="text-black mr-4" />
                    <span className="text-[16px]">info@inkspire.com</span>
                  </li>

                  <li className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center justify-center lg:justify-start">
                    <FaMapMarkerAlt size={22} className="text-black mr-4" />
                    <span className="text-[16px] text-center lg:text-left">
                    4730 Littlejohn St, Baldwin Park, CA 91706
                      <br />
                      Newyork - 4100, USA
                    </span>
                  </li>
                </ul>
      </div>

      <div className="rounded-lg bg-gray-100 p-8 shadow-lg lg:col-span-3 lg:p-12">
      <h1 className='text-2xl font-bold'>Leave us a message</h1>
      <p className='mb-6 mt-4'>   Use the form below to get in touch with us</p>
        <form action="#" className="space-y-8">
          <div>
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
              />
            </div>
          </div>

    
          <div>
            <label className="sr-only" htmlFor="message">Message</label>

            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-[#3498DB] px-5 py-3 font-medium  sm:w-auto text-white"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Contact;