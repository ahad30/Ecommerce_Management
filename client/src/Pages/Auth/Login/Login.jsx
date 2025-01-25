import React from 'react'
import { Link } from 'react-router-dom';
import img from "../../../assets/banner/contact-banner.jpg";
import { FaGreaterThan, FaHome } from 'react-icons/fa';

const Login = () => {
  return (
    <>
       <div className="relative mb-5">
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
            <p className='uppercase font-bold text-xl'>Login Here</p>
              <nav className="flex justify-center space-x-3 py-8">
              
                <Link
                  to="/"
                  className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
                >
                  <FaHome className='text-blue-300' size={20}/>
                </Link>
                <span className="text-lg text-gray-300 mt-1"><FaGreaterThan size={15}/></span>
                <Link
                  to="/login"
                  className="text-base font-medium hover:text-gray-300 transition-all duration-200"
                >
                 Login
                </Link>
              </nav>
            </div>
          </div>
    <section className="relative flex flex-wrap flex-row-reverse lg:items-center">
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
  
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
          ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
  
      <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
  
          <div className="relative">
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
  
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
          <Link to={"/register"}>
          <span className="underline text-blue-500" href="/register">Sign up</span>
          </Link>  
          </p>
  
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  
    <div className="h-64 w-full sm:h-96 hidden lg:block lg:h-full lg:w-1/2 mt-16 mb-16">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        className="h-[580px] w-full object-cover"
      />
    </div>
  </section>
   </>
  )
}

export default Login;