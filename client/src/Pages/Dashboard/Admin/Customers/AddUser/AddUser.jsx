"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddUserMutation } from "@/redux/Feature/Admin/usersmanagement/userApi";

const AddUser = () => {
  const dispatch = useAppDispatch();
  const [createUser, { isLoading: CIsloading, isError: CIsError, error: CError, isSuccess: CIsSuccess, data }] = useAddUserMutation();

  const handleSubmit = (data) => {
    createUser(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}  
        formType="create"  
        data={data}
        buttonName="Create"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="erpUsername"
            type="text"
            label="Username"
            defaultKey={""}
            placeholder={"Enter the username"}
          />
          <ZInputTwo
            name="erpUserEmail"
            type="email"
            label="Email"
            defaultKey={""}
            placeholder={"Enter the email"}
          />
          <ZInputTwo
            name="erpUserPhone"
            type="text"
            label="Phone"
            defaultKey={""}
            placeholder={"Enter the phone number"}
          />
          <ZInputTwo
            name="erpUserFullName"
            type="text"
            label="Full Name"
            defaultKey={""}
            placeholder={"Enter the full name"}
          />
          <ZInputTwo
            name="erpUserPassword"
            type="password"
            label="Password"
            defaultKey={""}
            placeholder={"Enter the password"}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddUser;
