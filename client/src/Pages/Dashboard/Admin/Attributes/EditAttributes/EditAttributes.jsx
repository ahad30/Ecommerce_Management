"use client";
import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { CiTrash } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useUpdateAttributesMutation } from "../../../../../redux/Feature/Admin/attribute/attributesApi";
import { setIsEditModalOpen } from "../../../../../redux/Modal/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/Hook/Hook";
import ZInputTwo from "../../../../../components/Form/ZInputTwo";
import ZFormTwo from "../../../../../components/Form/ZFormTwo";


const EditAttributes = ({ selectedAttribute }) => {
  console.log(selectedAttribute)

  const dispatch = useAppDispatch();
  const [previousAttributeValues, setPreviousAttributeValues] = useState([]);
  const [addAttributeValue, setAddAttributeValue] = useState([1]);
  const [deletedIds, setDeletedIds] = useState([]);
  const { isEditModalOpen } = useAppSelector((state) => state.modal);
  const [updateAttribute, { isLoading, isError, isSuccess, error, data }] =
    useUpdateAttributesMutation();


  

  useEffect(() => {
    if (!isEditModalOpen) {
      setAddAttributeValue([1]);
    }
  }, [isEditModalOpen]);


  useEffect(() => {
    if (selectedAttribute?.value || !isEditModalOpen || isSuccess) {
      setPreviousAttributeValues(selectedAttribute?.value);
    }
  }, [
    selectedAttribute?.value,
    selectedAttribute,
    isSuccess,
    isEditModalOpen,
  ]);

  const handlePreviousItemDelete = async (id) => {
    setDeletedIds([...deletedIds, id]);
    const filterData = previousAttributeValues.filter((item) => item.id !== id);
    setPreviousAttributeValues([...filterData]);
  };

  const handleAddAttributeValue = () => {
    setAddAttributeValue([...addAttributeValue, addAttributeValue.length + 1]);
  };

  const handleRemoveAttributeValue = (pageValue) => {
    const updatedPages = addAttributeValue.filter((item) => item !== pageValue);
    setAddAttributeValue([...updatedPages]);
  };

  const handleInputChange = (index, value) => {
    const updatedPages = [...addAttributeValue];
    updatedPages[index] = value;
    // console.log(updatedPages);
    setAddAttributeValue(updatedPages);
  };
   
 
  

  


    

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  const handleSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData);

    try {
   

      const valuesData = formData?.value?.filter(
        (item) => item !== undefined && item !== ""
      );

      const updatedData = {
        name: formData.name,
        value: valuesData,
        // value_ids: deletedIds || [],
      };

      console.log("Updated Data to Submit:", updatedData);

      await updateAttribute({
        id: selectedAttribute?.id,
        data: updatedData,
      }).unwrap();

      setAddAttributeValue([""]);
      console.log("Attribute updated successfully!");
    } catch (err) {
      console.error("Error updating attribute:", err);
    }
  };

  return (
    <div>
      <div>
        <h3 className="border-b mb-2 font-bold border-black ">
          Previous values
        </h3>
        <div className="grid mb-12 pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {previousAttributeValues?.length > 0
            ? previousAttributeValues?.map((item) => (
                <div key={item} className="relative">
                  <Alert message={item} type="info" />
                  <span
                    onClick={() =>{ 
                      handlePreviousItemDelete(item?.id)
                    }}
                    className="cursor-pointer absolute bg-red-500 p-1 rounded-full -top-2 -right-2 text-white"
                  >
                    <CiTrash size={20}></CiTrash>
                  </span>
                </div>
              ))
            : "There are no previous values"}
        </div>
      </div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
        buttonName="Update Attribute"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Attribute Name */}
          <ZInputTwo
            required
            name="name"
            type="text"
            label="Attribute Name"
            placeholder="Enter Attribute Name"
            value={selectedAttribute?.name || ""}
          />

          <div>
            <h4 className="text-lg font-semibold mb-3">New Attribute Value</h4>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar mb-5">
              {addAttributeValue.map((page, index) => (
                <div key={index} className="flex  gap-4 items-center">
                  <div className="w-[90%]">
                    <ZInputTwo
                      name={`value.${index}`}
                      type="text"
                      label="Value Name"
                      placeholder="Enter Value Name"
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      reset
                    />
                  </div>
                  <div className="">
                    {index === 0 && (
                      <button
                        type="button"
                        onClick={handleAddAttributeValue}
                        className="bg-blue-500 text-white py-1 mt-2 px-2 rounded"
                      >
                        <AiOutlinePlus size={15} />
                      </button>
                    )}
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAttributeValue(page)}
                        className="bg-red-500 text-white rounded px-2 py-1 mt-2 "
                      >
                        <AiOutlineMinus size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </ZFormTwo>
    </div>
  );
};

export default EditAttributes;
