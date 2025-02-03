import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <section className="bg-gray-900 text-white -mb-8">
  <div className=" px-4 py-32 lg:flex lg:h-[100vh] lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Thank you

        <span className="sm:block"> for your purchase </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Please check your email of your order confirmation.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to={`/`}
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
         
        >
          Go back
        </Link>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Success;
