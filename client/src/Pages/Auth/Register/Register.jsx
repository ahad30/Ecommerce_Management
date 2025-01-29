"use client";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ZInputTwo from "../../../components/Form/ZInputTwo";
import ZFormTwo from "../../../components/Form/ZFormTwo";
import ZEmail from "../../../components/Form/ZEmail";
import ZPhone from "../../../components/Form/ZPhone";
import { FaGreaterThan, FaHome } from "react-icons/fa";
import img from "../../../assets/banner/contact-banner.jpg";
import { useRegisterMutation } from "../../../redux/Feature/auth/authApi";


const Register = () => {  
  const navigate = useNavigate();
  const [
    register,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: rData,
    },
  ] = useRegisterMutation();
  // console.log(rData)

  const handleSubmit = (data) => {
    register({...data , role:"user"});
  };

  useEffect(() => {
    if (lIsSuccess) {
        navigate("/login");
    }
  }, [lIsSuccess]);

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
            <p className='uppercase font-bold text-xl'>Register Here</p>
              <nav className="flex justify-center space-x-3 py-8">
              
                <Link
                  to="/"
                  className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
                >
                  <FaHome className='text-blue-300' size={20}/>
                </Link>
                <span className="text-lg text-gray-300 mt-1"><FaGreaterThan size={15}/></span>
                <Link
                  to="/register"
                  className="text-base font-medium hover:text-gray-300 transition-all duration-200"
                >
                 Register
                </Link>
              </nav>
            </div>
          </div>
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
   
        <div className="relative py-3 sm:w-[40%] sm:mx-auto">

          <div className="relative px-4 py-10 bg-gray-100 md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl">
            <div className="max-w-md mx-auto text-center">
            <ZFormTwo
        isLoading={lIsloading}
        error={error}
        isError={lIsError}
        isSuccess={lIsSuccess}
        submit={handleSubmit}
        data={rData}
        buttonName={'Register'}
      >
              <div>
                <h1 className="text-2xl mt-2 text-center font-bold">Create an account</h1>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                 
                  <ZInputTwo
                    name="name"
                    type="text"
                    label="Full name"
                    required
                    defaultKey={""}
                    placeholder={"Enter your Full Name"}
                  />
                </div>
                <div className="relative mb-8">
                  <ZEmail label={"Email"} name={"email"} />
                </div>
                <div className="relative mb-8">
                  <ZPhone label={"Phone"} name={"phone"} />
                </div>
                <div className="relative">
                  <ZInputTwo
                  required
                    name="password"
                    type="password"
                    label="password"
                    defaultKey={""}
                    placeholder={"Enter your password"}
                  />
                </div>
              </div>
              </ZFormTwo>
            </div>

 
             <div className="flex items-center justify-center mt-5">
                      <p className="text-sm text-gray-500">
                        Already have an account?
                      <Link to={"/login"}>
                      <span className="underline text-blue-500">Sign in</span>
                      </Link>  
                      </p>
              
                      {/* <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                      >
                       Sign up
                      </button> */}
                    </div>
          </div>
        </div>
 
    </div>
    </>

  );
};

export default Register;
