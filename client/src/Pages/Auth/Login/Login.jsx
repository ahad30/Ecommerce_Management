import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from "../../../assets/banner/contact-banner.jpg";
import { FaGreaterThan, FaHome } from 'react-icons/fa';
import ZFormTwo from '../../../components/Form/ZFormTwo';
import ZEmail from '../../../components/Form/ZEmail';
import Cookies from "js-cookie";
import { useLoginMutation } from '../../../redux/Feature/auth/authApi';
import ZInputTwo from '../../../components/Form/ZInputTwo';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook/Hook';
import { setUser, useCurrentToken, useCurrentUser } from '../../../redux/Feature/auth/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const dispatch = useAppDispatch();
 const user = useAppSelector(useCurrentUser);
 const token = useAppSelector(useCurrentToken);

  const [
    login,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: loginData,
    },
  ] = useLoginMutation();
//  console.log(loginData)


  useEffect(() => {
    if (token && user?.role === "admin") {
      navigate("/admin/home")
    }
    else if (token && user?.role === "user"){
      navigate("/")
    }
  }, []);


  
  const handleSubmit = async (data) => {
    const { data: loginData } = await login(data);
    if (loginData.success) {
      dispatch(setUser({ token: loginData.token, user: loginData.user }));
      if (loginData?.user?.role === "user") {
        navigate("/");
      } else if (loginData?.user?.role === "admin") {
        localStorage.removeItem("dropDown");
        navigate("/admin/home");
      }
    }
  };
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
  
      <ZFormTwo
              isLoading={lIsloading}
              error={error}
              isError={lIsError}
              isSuccess={lIsSuccess}
              submit={handleSubmit}
              data={loginData}
              buttonName={"Log in"}
            >
 
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative mb-8">
                  <ZEmail label={"Email"}
                   value={"n@gmail.com"}
                   name={"email"}
                   placeholder={"enterEmail"}
                    required={1}/>
                </div>
                <div className="relative">
                  <ZInputTwo
                    required={1}
                    name="password"
                    type="password"
                    label={"Password"}
                    value={"123456"}
                    placeholder={"Enter your password"}
                  />
                </div>
              </div>
            </ZFormTwo>
            <div className="flex items-center justify-center mt-5">
              <p className="text-sm text-gray-500">
                Don't have an account?
                <Link to={"/register"}>
                  <span className="underline text-blue-500">Sign up</span>
                </Link>
              </p>
            </div>     
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